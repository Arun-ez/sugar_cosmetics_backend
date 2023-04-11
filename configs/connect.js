require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connect = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connect;