const express = require('express');
const cors = require('cors');
const categoriesModel = require('../entity/category');

const categoryRouter = express.Router();
categoryRouter.use(cors());

categoryRouter.post('/', async (req, res) => {
    try {
        const newCategory = new categoriesModel(req.body);
        await newCategory.save();
        res.status(201).send(newCategory);
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while creating the category.' });
    }
});

categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await categoriesModel.find({});
        res.send(categories);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching categories.' });
    }
});

categoryRouter.get('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoriesModel.findById(categoryId);

        if (!category) {
            return res.status(404).send({ error: 'Category not found.' });
        }

        res.send(category);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching the category.' });
    }
});

categoryRouter.put('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updatedCategory = await categoriesModel.findByIdAndUpdate(categoryId, req.body, { new: true });

        if (!updatedCategory) {
            return res.status(404).send({ error: 'Category not found.' });
        }

        res.send(updatedCategory);
    } catch (error) {
        res.status(400).send({ error: 'An error occurred while updating the category.' });
    }
});

categoryRouter.delete('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoriesModel.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).send({ error: 'Category not found.' });
        }

        res.send({ message: 'Category deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while deleting the category.' });
    }
});

module.exports = categoryRouter;
