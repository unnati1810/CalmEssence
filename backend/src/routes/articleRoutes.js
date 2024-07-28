const express = require('express');
const router = express.Router();
const { getArticleList, createArticle, updateArticle } = require('../controllers/articleController');

router.get('/list', getArticleList);
router.post('/create', createArticle);
router.put('/update', updateArticle);

module.exports = router;
