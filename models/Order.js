const { generate } = require('../libs/orderIdGenerator');
const { Schema, model, default: mongoose } = require('mongoose');

const orderSchema = new Schema({

    order_id: {
        type: String,
        default: generate()
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    products: {
        type: Array,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    ordered_on: {
        type: String,
        required: true
    },

    delivered_on: {
        type: String,
        required: true,
    },

    status: {
        type: Number,
        default: 0
    },

    address: {
        type: Object,
        required: true
    }

}, { timestamps: true })


module.exports = model("orders", orderSchema);