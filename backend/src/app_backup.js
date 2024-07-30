const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  RtcTokenBuilder =  require('agora-token');
const {RtcRole} = require("agora-token");
const mysql = require('mysql2/promise');


const app_backup = express();
const port = 8080;

// Agora App ID and App Certificate
const APP_ID = 'e947c59bbe8c4287954cb154e63be817';
const APP_CERTIFICATE = '95f38223d7e84dd58236f7bd09b85096';

// Use the CORS middleware
app_backup.use(cors());
app_backup.use(bodyParser.json());

// MySQL connection
const dbConfig = {
    host: 'calm-essence-db.cpjso9ykqf1z.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '#WebGroup8',
    database: 'calm_essence',
};

let connection;
mysql.createConnection(dbConfig)
    .then(conn => {
        connection = conn;
        console.log('Connected to MySQL database');
    })
    .catch(err => {
        console.error('Unable to connect to MySQL:', err);
    });






app_backup.post('/generate-token', async (req, res) => {
    const { channelName, uid, role, user_email } = req.body;

    // Validate inputs
    if (!channelName || uid === undefined || !role || !user_email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Set expiration time to current timestamp + 1 hour (3600 seconds)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimeInSeconds = 3600;

    // Map role to RtcRole enum
    let roleEnum;
    if (role === 'publisher') {
        roleEnum = RtcRole.PUBLISHER;
    } else if (role === 'subscriber') {
        roleEnum = RtcRole.SUBSCRIBER;
    } else {
        return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        const tokenWithUid = RtcTokenBuilder.RtcTokenBuilder.buildTokenWithUserAccount(
            APP_ID, APP_CERTIFICATE, channelName, uid, roleEnum, currentTimestamp + expirationTimeInSeconds
        );

        // Get session_id for the given channelName
        const [sessionRows] = await connection.execute('SELECT session_id FROM session WHERE agora_channel_id = ?', [channelName]);

        if (sessionRows.length === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const sessionId = sessionRows[0].session_id;

        // Check if the token already exists for the user and session
        const [tokenRows] = await connection.execute(
            'SELECT token_id FROM session_token WHERE session_id = ? AND user_id = ? AND user_email = ?',
            [sessionId, uid, user_email]
        );

        if (tokenRows.length > 0) {
            // Update the existing token
            await connection.execute(
                'UPDATE session_token SET token = ? WHERE token_id = ?',
                [tokenWithUid, tokenRows[0].token_id]
            );
        } else {
            // Insert the token into session_token table
            await connection.execute(
                'INSERT INTO session_token (session_id, user_id, user_email, token) VALUES (?, ?, ?, ?)',
                [sessionId, uid, user_email, tokenWithUid]
            );
        }

        res.json({
            token: tokenWithUid,
            session_id: sessionId,
            user_id: uid,
            user_email: user_email,
            role: role
        });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Error generating token' });
    }
});



app_backup.post('/create-session', async (req, res) => {
    const {
        title,
        description,
        session_date,
        session_time,
        expert_id,
        expert_email,
        role
    } = req.body;

    if (!title || !session_date || !session_time || !expert_id || !expert_email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Insert the session into the database
        const [insertResult] = await connection.execute(
            `INSERT INTO session (title, description, session_date, session_time, expert_id, expert_email)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, session_date, session_time, expert_id, expert_email]
        );

        const sessionId = insertResult.insertId;

        // Update the agora_channel_id with the sessionId
        await connection.execute(
            `UPDATE session SET agora_channel_id = ? WHERE session_id = ?`,
            [sessionId, sessionId]
        );

        res.status(201).json({
            message: 'Session created successfully',
            sessionId: sessionId,
            agoraChannelId: sessionId
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Error creating session' });
    }
});



app_backup.post('/edit-session', async (req, res) => {
    const {
        session_id,
        title,
        description,
        session_date,
        session_time,
        actual_start_time,
        status
    } = req.body;

    if (!session_id) {
        return res.status(400).json({ error: 'Missing session_id' });
    }

    try {
        // Build the update query dynamically based on provided fields
        const fieldsToUpdate = {};
        if (title !== undefined) fieldsToUpdate.title = title;
        if (description !== undefined) fieldsToUpdate.description = description;
        if (session_date !== undefined) fieldsToUpdate.session_date = session_date;
        if (session_time !== undefined) fieldsToUpdate.session_time = session_time;
        if (actual_start_time !== undefined) fieldsToUpdate.actual_start_time = actual_start_time;
        if (status !== undefined) fieldsToUpdate.status = status;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
        const values = Object.values(fieldsToUpdate);
        values.push(session_id);

        // Update the session in the database
        const [updateResult] = await connection.execute(
            `UPDATE session SET ${setClause} WHERE session_id = ?`,
            values
        );

        res.status(200).json({
            message: 'Session updated successfully',
            affectedRows: updateResult.affectedRows
        });
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ error: 'Error updating session' });
    }
});



// API endpoint to fetch the breathing list with pagination and search
app_backup.get('/breathing-list', async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;
    // Calculate offset for pagination
    // const offset = (page - 1) * pageSize;
    console.log('Query Parameters:', [`%${searchTerm}%`, pageSize, offset]);

    try {
        // Fetch the breathing exercises with pagination and search
        const sqlQuery = `
    SELECT *
    FROM breathing
    WHERE title LIKE '%${searchTerm}%'
    ORDER BY created_at DESC
    LIMIT ${pageSize} OFFSET ${offset}
`;
        console.log('SQL Query:', sqlQuery);
        const [results] = await connection.execute(sqlQuery);


        // Fetch total count for pagination
        const [[{ count }]] = await connection.execute(`
            SELECT COUNT(*) AS count
            FROM breathing
            WHERE title LIKE ?
        `, [`%${searchTerm}%`]);

        res.json({
            data: results,
            pagination: {
                page: page,
                pageSize: pageSize,
                totalItems: count,
                totalPages: Math.ceil(count / pageSize)
            }
        });
    } catch (error) {
        console.error('Error fetching breathing list:', error);
        res.status(500).json({ error: 'Error fetching breathing list' });
    }
});





// Create a new breathing exercise
app_backup.post('/create-breathing', async (req, res) => {
    const {
        title,
        description,
        duration,
        image,
        text_content,
        media_type,
        content_url,
        user_id,
        user_name,
        user_email
    } = req.body;

    if (!title || !media_type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await connection.execute(
            `INSERT INTO breathing (title, description, duration, image, text_content, media_type, content_url, user_id, user_name, user_email)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description, duration, image, text_content, media_type, content_url, user_id, user_name, user_email]
        );

        res.status(201).json({
            message: 'Breathing exercise created successfully',
            breathing_id: result.insertId
        });
    } catch (error) {
        console.error('Error creating breathing exercise:', error);
        res.status(500).json({ error: 'Error creating breathing exercise' });
    }
});


// API endpoint to fetch the article list with pagination and search
app_backup.get('/article-list', async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;

    console.log('Query Parameters:', [`%${searchTerm}%`, pageSize, offset]);

    try {

        const sqlQuery =`
            SELECT *
            FROM articles
        WHERE title LIKE '%${searchTerm}%'
        ORDER BY created_at DESC
        LIMIT ${pageSize} OFFSET ${offset}
        `;
        console.log('SQL Query:', sqlQuery);
        const [results] = await connection.execute(sqlQuery);

        // Fetch total count for pagination
        const [[{ count }]] = await connection.execute(`
            SELECT COUNT(*) AS count
            FROM articles
            WHERE title LIKE ?
        `, [`%${searchTerm}%`]);

        res.json({
            data: results,
            pagination: {
                page: page,
                pageSize: pageSize,
                totalItems: count,
                totalPages: Math.ceil(count / pageSize)
            }
        });
    } catch (error) {
        console.error('Error fetching article list:', error);
        res.status(500).json({ error: 'Error fetching article list' });
    }
});


// Create a new article
app_backup.post('/create-article', async (req, res) => {
    const {
        title,
        content_html,
        image,
        user_id,
        user_name,
        user_email,
        tags
    } = req.body;

    if (!title || !content_html || !user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await connection.execute(
            `INSERT INTO articles (title, content, image, user_id, user_name, user_email, tags, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [title, content_html, image, user_id, user_name, user_email, tags]
        );

        res.status(201).json({
            message: 'Article created successfully',
            article_id: result.insertId
        });
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: 'Error creating article' });
    }
});


app_backup.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
