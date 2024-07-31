const mongoose = require('../models/db');
const Blog = require('../models/blog');

const updateBlog = (req, res) => {
// app.post('/blog-update', (req, res) => {
    const { user, title, body } = req.body;
    console.log('here1')
    const blog = { user, title, body: JSON.stringify(body) };
    console.log('here2')
    console.log(blog);
    Blog.findOneAndUpdate({ user, title}, blog, { upsert: true, new: true }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).send('parse fail');
    })
}

const getBlogs = (req, res) => {
// app.get('/blogs', (req, res) => {
    Blog.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).send('parse fail');
    })
}

const getBlog = (req, res) => {
// app.post('/blog', (req, res) => {
    const { user, title } = req.body
    Blog.findOne({ user, title }).then(result => {
        res.status(200).json(result);
        
    }).catch(err => {
        res.status(500).send('parse fail');
    })
}

module.exports = {
    updateBlog,
    getBlogs,
    getBlog
}