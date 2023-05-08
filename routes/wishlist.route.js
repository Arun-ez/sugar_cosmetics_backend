const express = require('express');
const router = express.Router();
const { token_validator } = require('../middlewares/token_validator');
const { getWishlistData, postWishlistData, deleteWishlistData, isExist } = require('../controllers/wishlist');


router.get("/", token_validator, async (req, res) => {
    try {
        let response = await getWishlistData(req.data);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

router.post("/", token_validator, async (req, res) => {
    try {
        let response = await postWishlistData(req.data, req.body);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})


router.delete("/:id", token_validator, async (req, res) => {
    try {
        let response = await deleteWishlistData(req.data, req.params);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

router.get("/exist/:id", token_validator, async (req, res) => {
    try {
        let response = await isExist(req.data, req.params);
        res.send(response);
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
})

module.exports = router