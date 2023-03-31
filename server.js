const express = require('express');
const { connect } = require('./connect');
const app = express();
const PORT = 8080;
app.use(express.json());

connect();

app.use("/create", require('./routes/NewUser'));
app.use("/products", require('./routes/Products'));

app.get('/', (req, res) => {
    res.send("Server running...");
})

app.get('/users', (req, res) => {
    res.send(`Hey ${PORT}`);
})

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    res.send(`Hey ${id}`);
})

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})