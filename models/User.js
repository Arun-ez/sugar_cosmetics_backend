const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        },

        cart: {
            type: Array,
            default: []
        },

        wishlist: {
            type: Array,
            default: []
        },

        auth_type: {
            type: String
        },

        addresses: {
            type: Array,
            default: []
        }
    }
)

module.exports = mongoose.model("users", UserSchema);