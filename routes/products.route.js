const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getAllProducts, getProductById } = require('../controllers/products');


router.get('/', async (req, res) => {
    try {
        const response = await getAllProducts();
        res.json(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const response = await getProductById(req.params.id);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const response = await Product.create(data);
        res.send(data);
    } catch (error) {
        res.send({ error: error })
    }

})


module.exports = router;