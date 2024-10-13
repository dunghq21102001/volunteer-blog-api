const express = require('express');
const cors = require('cors');
const blogModel = require('../entity/blog');
const categoryModel = require('../entity/category');
const mongoose = require('mongoose');


const blogRouter = express.Router();

blogRouter.post('/update', async (req, res) => {
    try {
        const { blogId } = req.body;

        if (!blogId) {
            return res.status(400).send({ error: 'Blog ID is required.' });
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(blogId, req.body, { new: true });

        if (!updatedBlog) {
            return res.status(404).send({ error: 'Blog not found.' });
        }

        res.send(updatedBlog);
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while updating the blog.' });
    }
});

blogRouter.post('/delete', async (req, res) => {
    try {
        const { blogId } = req.body;

        if (!blogId) {
            return res.status(400).send({ error: 'Blog ID is required.' });
        }

        const deletedBlog = await blogModel.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).send({ error: 'Blog not found.' });
        }

        res.send({ message: 'Blog deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the blog.' });
    }
});

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
        const { page = 0, size = 10, sort = 'createdDate,desc' } = req.query;
        const pageInt = parseInt(page);
        const sizeInt = parseInt(size);

        const sortFields = sort.split(',');
        const sortObject = {};
        sortObject[sortFields[0]] = sortFields[1] === 'desc' ? -1 : 1;

        const skip = pageInt * sizeInt;

        const listBlog = await blogModel.find({})
            .skip(skip)
            .limit(sizeInt)
            .sort(sortObject);

        const total = await blogModel.countDocuments({});
        const listBlogWithCategoryName = await Promise.all(listBlog.map(async (blog) => {
            const category = await categoryModel.findById(blog.category);
            const categoryName = category ? category.name : 'Unknown Category';
            return {
                ...blog.toObject(),
                categoryName,
            };
        }));

        res.send({
            data: listBlogWithCategoryName,
            total: total,
        });
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


module.exports = blogRouter;
