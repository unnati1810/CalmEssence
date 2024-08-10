const {getConnection} = require('../models/db');

// Function to create a new session
const createSession = async (req, res) => {
    const { title, description, session_date, session_time, duration, expert_id, expert_email } = req.body;

    if (!title || !session_date || !session_time || duration === undefined || !expert_id || !expert_email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const connection = getConnection();
        const [insertResult] = await connection.execute(
            `INSERT INTO session (title, description, session_date, session_time, duration, expert_id, expert_email)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, session_date, session_time, duration, expert_id, expert_email]
        );

        const sessionId = insertResult.insertId;
        await connection.execute(`UPDATE session
                                  SET agora_channel_id = ?
                                  WHERE session_id = ?`, [sessionId, sessionId]);

        res.status(201).json({
            message: 'Session created successfully',
            sessionId: sessionId,
            agoraChannelId: sessionId
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Error creating session' });
    }
};

// Function to edit an existing session
const editSession = async (req, res) => {
    const { session_id, title, description, session_date, session_time, duration, actual_start_time, status } = req.body;

    if (!session_id) {
        return res.status(400).json({ error: 'Missing session_id' });
    }

    try {
        const connection = getConnection();
        const fieldsToUpdate = {};
        if (title !== undefined) fieldsToUpdate.title = title;
        if (description !== undefined) fieldsToUpdate.description = description;
        if (session_date !== undefined) fieldsToUpdate.session_date = session_date;
        if (session_time !== undefined) fieldsToUpdate.session_time = session_time;
        if (duration !== undefined) fieldsToUpdate.duration = duration;
        if (actual_start_time !== undefined) fieldsToUpdate.actual_start_time = actual_start_time;
        if (status !== undefined) fieldsToUpdate.status = status;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
        const values = Object.values(fieldsToUpdate);
        values.push(session_id);

        const [updateResult] = await connection.execute(`UPDATE session
                                                         SET ${setClause}
                                                         WHERE session_id = ?`, values);

        res.status(200).json({
            message: 'Session updated successfully',
            affectedRows: updateResult.affectedRows
        });
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ error: 'Error updating session' });
    }
};

// Function to get a list of sessions with pagination and search
const getSessionList = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;

    try {
        const connection = getConnection();
        // Fetch the sessions with pagination and search

        const sqlQuery = `
            SELECT *
            FROM session
            WHERE title LIKE '%${searchTerm}%' AND status != 'completed'
            ORDER BY session_date DESC
                LIMIT ${pageSize}
            OFFSET ${offset}
        `;
        console.log('SQL Query:', sqlQuery);
        const [results] = await connection.execute(sqlQuery);
        // Fetch total count for pagination
        const [[{count}]] = await connection.execute(`
            SELECT COUNT(*) AS count
            FROM session
            WHERE title LIKE ?  AND status != 'completed'
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
        console.error('Error fetching session list:', error);
        res.status(500).json({error: 'Error fetching session list'});
    }
};



// Function to handle contact form submission
const contactUS = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const connection = getConnection();
        const [insertResult] = await connection.execute(
            `INSERT INTO contactus (name, email, message)
             VALUES (?, ?, ?)`,
            [name, email, message]
        );

        res.status(200).json({
            message: 'Message sent successfully',
            contactId: insertResult.insertId,
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Error submitting contact form' });
    }
};

module.exports = {createSession, editSession, getSessionList, contactUS };
