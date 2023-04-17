require('dotenv').config();

const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const CreateToken = (data) => {
    return jwt.sign(data, JWT_SECRET_KEY);
}

const VerifyToken = (token) => {
    try {
        const response = jwt.verify(token, JWT_SECRET_KEY);
        return { data: response }
    } catch (error) {
        return { error: error.message }
    }
}

const token_validator = async (req, res, next) => {

    const isExist = req.headers.hasOwnProperty("authorization");

    if (!isExist) {
        return res.status(404).send("Token not found");
    }

    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer") {
        return res.status(404).send({ error: "Invalid token type" });
    }

    const data = VerifyToken(token);

    if (data.error) {
        return res.status(404).send({ error: "Invalid token" });
    }

    req.data = data.data;
    next();
}

module.exports = { token_validator, CreateToken };