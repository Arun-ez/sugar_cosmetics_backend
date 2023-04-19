const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsByCategory, getProductByCategoryAndId, postProduct, searchProducts } = require('../controllers/products');


router.get('/', async (req, res) => {
    try {
        const response = await getAllProducts();
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.get('/search/:query', async (req, res) => {
    try {
        const response = await searchProducts(req.params.query);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})


router.get('/:category', async (req, res) => {
    try {
        const response = await getProductsByCategory(req.params, req.query);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.get('/:category/:id', async (req, res) => {
    try {
        const response = await getProductByCategoryAndId(req.params.category, req.params.id);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})


router.post('/', async (req, res) => {
    try {
        const response = await postProduct(req.body);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }

})


module.exports = router;