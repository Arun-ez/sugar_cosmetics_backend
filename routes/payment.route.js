
const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const router = express.Router();

router.post("/create", async (req, res) => {

    let { amount } = req.body;

    const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET });
    const options = { amount: Number(amount) * 100, currency: "INR", receipt: "sugar_4457" }

    try {
        let response = await instance.orders.create(options);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(error.statusCode).send({ error: error.error.description });
    }
})

router.post("/verify", (req, res) => {

    let { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    let payload = razorpay_order_id + '|' + razorpay_payment_id;

    let expected_sinature = crypto.createHmac('sha256', process.env.KEY_SECRET).update(payload).digest('hex');

    if (expected_sinature === razorpay_signature) {
        res.send({ status: true });
    } else {
        res.status(404).send({ status: false });
    }

})


module.exports = router;