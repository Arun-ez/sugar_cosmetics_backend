const mongoose = require('mongoose');
const URI = "mongodb+srv://arunshaw433:arunez_sugar_cosmetics@sugarcosmeticscluster.x0nsxfa.mongodb.net/SugarCosmetics?retryWrites=true&w=majority";

const connect = async () => {
    try {
        const connection = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };