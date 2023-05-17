const express = require('express');
const router = express.Router();
const { token_validator } = require('../middlewares/token_validator');
const { getAddressData, postAddressData, patchAddressData, deleteAddressData } = require('../controllers/address');

router.get('/', token_validator, async (req, res) => {
    try {
        let response = await getAddressData(req.data);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }

})

router.post('/', token_validator, async (req, res) => {

    if (!req.body.name || !req.body.number || !req.body.flatno || !req.body.locality || !req.body.pincode || !req.body.city || !req.body.state) {
        return res.status(404).send({ error: "name, number, flatno, locality, pincode, city, state are required fields" });
    }

    try {
        let response = await postAddressData(req.data, req.body);
        res.status(201).send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }

})

router.patch('/:id', token_validator, async (req, res) => {
    try {
        let response = await patchAddressData(req.data, req.body, req.params);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }

})

router.delete('/:id', token_validator, async (req, res) => {
    try {
        let response = await deleteAddressData(req.data, req.params);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }

})

module.exports = router;