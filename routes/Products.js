const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', async (req, res) => {
    try {
        const response = await Product.find();
        res.json(response);
    } catch (error) {
        res.send(error);
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