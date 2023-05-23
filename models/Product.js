const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ProductSchema = new Schema(
    {
        Title: {
            type: String,
            required: true
        },

        Title_URL: {
            type: String,
            required: true
        },

        images: {
            type: Array,
            required: true
        },

        isListed: {
            type: Boolean,
            default: false
        },

        Description: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        items: {
            type: String,
            default: ""
        },

        brandcolor: {
            type: String,
        },

        filter: {
            type: String,
            required: true
        },

        rating: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        offers: {
            type: Array,
            required: true
        },

        benifts: {
            type: Array,
            required: true
        },

        desc: {
            type: String,
            required: true
        },

        qty: {
            type: Number,
            default: 0
        }
    }
)

module.exports = mongoose.model("products", ProductSchema);