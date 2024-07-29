const connection = require('../models/db');
const {getConnection} = require("../models/db");

const getArticleList = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;

    console.log('Query Parameters:', [`%${searchTerm}%`, pageSize, offset]);

    try {
        const connection = getConnection();

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
};

const createArticle = async (req, res) => {
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
        const connection = getConnection();
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
};

const updateArticle = async (req, res) => {
    const { article_id, title, description, duration, image, text_content, media_type, content_url } = req.body;

    if (!article_id) {
        return res.status(400).json({ error: 'Missing article_id' });
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
        values.push(article_id);

        const [updateResult] = await connection.execute(`UPDATE article SET ${setClause} WHERE article_id = ?`, values);

        res.status(200).json({
            message: 'Article updated successfully',
            affectedRows: updateResult.affectedRows
        });
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ error: 'Error updating article' });
    }
};

module.exports = { getArticleList, createArticle, updateArticle };
