const express = require('express');
const router = express.Router();
const { postProduct, patchProduct, getAllProducts, getProductsByCategory, getProductByCategoryAndId, searchProducts } = require('../controllers/products');


router.get('/', async (req, res) => {
    try {
        const response = await getAllProducts(req.query.limit);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.post('/', async (req, res) => {

    if (!req.query.API_KEY) {
        return res.status(404).send({ error: "API_KEY is required in query" });
    }

    if (req.query.API_KEY !== process.env.API_KEY) {
        return res.status(401).send({ error: "Invalid API_KEY provided" })
    }

    try {
        const response = await postProduct(req.body);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }

})

router.patch('/', async (req, res) => {

    if (!req.query.API_KEY) {
        return res.status(404).send({ error: "API_KEY is required in query" });
    }

    if (req.query.API_KEY !== process.env.API_KEY) {
        return res.status(401).send({ error: "Invalid API_KEY provided" })
    }

    if (!req.query.id) {
        return res.status(404).send({ error: "id is required in query" });
    }

    try {
        const response = await patchProduct(req.body, req.query.id);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const response = await searchProducts(req.query);
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

module.exports = router;