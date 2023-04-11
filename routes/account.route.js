const express = require('express');
const router = express.Router();
const { token_validator } = require('../middlewares/token_validator');
const User = require('../models/User');
const { getUser, registerUser, loginUser } = require('../controllers/account');


router.post('/token', token_validator, async (req, res) => {
    try {
        const response = await getUser(req.data);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.post('/register', async (req, res) => {
    try {
        const resposne = await registerUser(req.body);
        res.send(resposne);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const resposne = await loginUser(req.body);
        res.send(resposne);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})


module.exports = router;