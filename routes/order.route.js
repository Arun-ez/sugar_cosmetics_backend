
const express = require('express');
const router = express.Router();
const { token_validator } = require('../middlewares/token_validator');

const { getOrdersData, postOrderData } = require('../controllers/order');

router.get("/", token_validator, async (req, res) => {
    try {
        let response = await getOrdersData(req.data);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})


router.post("/", token_validator, async (req, res) => {
    try {
        let response = await postOrderData(req.data, req.body);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})



module.exports = router;