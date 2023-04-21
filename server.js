const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const connect = require('./configs/connect');

app.use(express.json());
app.use(cors());
app.use("/api/account", require('./routes/account.route'));
app.use("/api/products", require('./routes/products.route'));
app.use("/api/cart", require('./routes/cart.route'));

connect();


app.get('/', (req, res) => {
    res.send("Server running...");
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})