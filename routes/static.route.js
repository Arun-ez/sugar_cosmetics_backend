const express = require('express');
const router = express.Router();
const { getStaticProducts } = require('../controllers/static');

router.get('/', async (req, res) => {
    try {
        const response = await getStaticProducts();
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

module.exports = router;