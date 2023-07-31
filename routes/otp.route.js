const express = require('express');
const router = express.Router();

const { sendOtp, verifyOtp } = require('../controllers/otp');

router.post('/send', async (req, res) => {

    try {
        let response = await sendOtp(req.body.email);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

router.post('/verify', async (req, res) => {
    try {
        let response = await verifyOtp(req.body);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

module.exports = router;