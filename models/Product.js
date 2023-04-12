const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ProductSchema = new Schema(
    {
        Title: {
            type: String,
            required: true
        },

        images: {
            type: Array,
            required: true
        },

        isListed: {
            type: Boolean,
            required: true
        },

        Description: {
            type: String,
            required: true
        },

        Price: {
            type: Number,
            required: true
        },

        items: {
            type: String,
            required: true
        },

        brandcolor: {
            type: String,
            required: true
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

        benifits: {
            type: Array,
            required: true
        },

        desc: {
            type: String,
            required: true
        },

        qty: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model("products", ProductSchema);