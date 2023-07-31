const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 8080;
const connect = require('./configs/connect');
app.use(express.json());
app.use(cors());
app.use("/api/static", require('./routes/static.route'));
app.use("/api/account", require('./routes/account.route'));
app.use("/api/products", require('./routes/products.route'));
app.use("/api/cart", require('./routes/cart.route'));
app.use("/api/wishlist", require('./routes/wishlist.route'));
app.use("/api/payment", require('./routes/payment.route'));
app.use("/api/order", require('./routes/order.route'));
app.use("/api/address", require('./routes/address.route'));
app.use("/api/otp", require('./routes/otp.route'));

connect();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})