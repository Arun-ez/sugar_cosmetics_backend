const express = require('express');
const router = express.Router();
const { token_validator } = require('../middlewares/token_validator');
const { getCartData, postCartData, patchCartData, deleteCartData, clearCartData } = require('../controllers/cart');

router.get('/', token_validator, async (req, res) => {
    try {
        let response = await getCartData(req.data);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }

})

router.post('/', token_validator, async (req, res) => {
    try {
        let response = await postCartData(req.data, req.body);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }

})


router.patch('/:id', token_validator, async (req, res) => {
    try {
        let response = await patchCartData(req.data, req.body, req.params);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.delete('/:id', token_validator, async (req, res) => {
    try {
        let response = await deleteCartData(req.data, req.params);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.messag });
    }
})

router.delete('/clear/all', token_validator, async (req, res) => {
    try {
        let response = await clearCartData(req.data);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.messag });
    }
})


module.exports = router;