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
            required: true
        },

        auth_type: {
            type: String
        }
    }
)

module.exports = mongoose.model("users", UserSchema);