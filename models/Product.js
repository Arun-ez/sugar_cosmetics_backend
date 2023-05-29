const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        source: {
            type: String,
            required: true
        },

        images: {
            type: Array,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        discount: {
            type: Number,
            default: 0
        },

        filter: {
            type: String,
            required: true
        },

        rating: {
            type: String,
            default: "1.0"
        },

        category: {
            type: String,
            required: true
        },

        offers: {
            type: Array,
            required: true
        },

        benifits: {
            type: Array,
            required: true
        },

        inventory: {
            type: Number,
            default: 0
        },

        reviews: {
            type: Array,
            default: []
        }
    }
)

module.exports = mongoose.model("products", ProductSchema);