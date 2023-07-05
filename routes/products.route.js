const express = require('express');
const router = express.Router();
const { getProducts, getProductId, searchProducts } = require('../controllers/products');


router.get('/', async (req, res) => {
    try {
        const response = await getProducts(req.query, req.headers.authorization);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.get('/search', async (req, res) => {
    try {
        const response = await searchProducts(req.query, req.headers.authorization);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})


router.get('/:id', async (req, res) => {
    try {
        const response = await getProductId(req.params, req.headers.authorization);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

module.exports = router;