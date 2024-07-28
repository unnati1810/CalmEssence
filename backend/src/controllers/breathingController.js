const { getConnection } = require('../models/db');

const getBreathingList = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;
    // Calculate offset for pagination
    // const offset = (page - 1) * pageSize;
    console.log('Query Parameters:', [`%${searchTerm}%`, pageSize, offset]);

    try {
        const connection = getConnection();
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
};

const createBreathing = async (req, res) => {
    const { title, description, duration, image, text_content, media_type, content_url, user_id, user_name, user_email } = req.body;

    if (!title || !media_type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const connection = getConnection();
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
};

const updateBreathing = async (req, res) => {
    const { breathing_id, title, description, duration, image, text_content, media_type, content_url } = req.body;

    if (!breathing_id) {
        return res.status(400).json({ error: 'Missing breathing_id' });
    }

    try {
        const connection = getConnection();
        const fieldsToUpdate = {};
        if (title !== undefined) fieldsToUpdate.title = title;
        if (description !== undefined) fieldsToUpdate.description = description;
        if (duration !== undefined) fieldsToUpdate.duration = duration;
        if (image !== undefined) fieldsToUpdate.image = image;
        if (text_content !== undefined) fieldsToUpdate.text_content = text_content;
        if (media_type !== undefined) fieldsToUpdate.media_type = media_type;
        if (content_url !== undefined) fieldsToUpdate.content_url = content_url;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ');
        const values = Object.values(fieldsToUpdate);
        values.push(breathing_id);

        const [updateResult] = await connection.execute(`UPDATE breathing SET ${setClause} WHERE breathing_id = ?`, values);

        res.status(200).json({
            message: 'Breathing exercise updated successfully',
            affectedRows: updateResult.affectedRows
        });
    } catch (error) {
        console.error('Error updating breathing exercise:', error);
        res.status(500).json({ error: 'Error updating breathing exercise' });
    }
};

module.exports = { getBreathingList, createBreathing, updateBreathing };
