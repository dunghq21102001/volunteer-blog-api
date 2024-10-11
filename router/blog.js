const express = require('express');
const cors = require('cors');
const blogModel = require('../entity/blog');
const mongoose = require('mongoose');


const blogRouter = express.Router();
blogRouter.use(cors());

blogRouter.post('/', async (req, res) => {
    try {
        const newBlog = new blogModel(req.body);
        await newBlog.save();
        res.status(201).send(newBlog);
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while creating the blog.' });
    }
});

blogRouter.get('/', async (req, res) => {
    try {
        const listBlog = await blogModel.find({});
        res.send(listBlog);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching blogs.' });
    }
});

blogRouter.get('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId);

        if (!blog) {
            return res.status(404).send({ error: 'Blog not found.' });
        }

        res.send(blog);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching the blog.' });
    }
});

blogRouter.get('/author/:userId', async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId(req.params.userId);
        const blogsByAuthor = await blogModel.find({ userId });

        res.send(blogsByAuthor);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching blogs by author.' });
    }
});

blogRouter.put('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, req.body, { new: true });

        if (!updatedBlog) {
            return res.status(404).send({ error: 'Blog not found.' });
        }

        res.send(updatedBlog);
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while updating the blog.' });
    }
});

blogRouter.delete('/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const deletedBlog = await blogModel.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).send({ error: 'Blog not found.' });
        }

        res.send({ message: 'Blog deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the blog.' });
    }
});

module.exports = blogRouter;
