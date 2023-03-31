const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {

    try {
        const data = req.body;
        const result = await User.findOne({ email: data.email });

        if (result) {
            return res.send({ error: "Email already exist" })
        }

        const NewUser = User(data);
        NewUser.save();
        res.send(data);
    } catch (error) {
        res.send({ error: error })
    }

})


module.exports = router;