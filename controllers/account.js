
const User = require('../models/User');
const { CreateToken } = require('../middlewares/token_validator');


const getUser = async (data) => {
    try {
        const response = await User.findOne({ email: data.email });
        const json = response.toJSON();
        return { success: { name: json.name, email: json.email } }
    } catch (error) {
        throw new Error(error);
    }
}

const registerUser = async (data) => {

    const response = await User.findOne({ email: data.email });

    if (response) {
        throw new Error('Account already exist');
    }

    try {
        const response = await User.create({ ...data, cart: [], auth_type: "native" });
        const json = response.toJSON();
        delete json.password;
        return { created: json };
    } catch (error) {
        throw new Error(error);
    }
}

const loginUser = async (data) => {
    try {

        let user = await User.findOne({ email: data.email });

        if (!user) {
            throw new Error('Data not found');
        }

        if (data.password !== user.password) {
            return { failed: "Wrong password" }
        }

        const token = CreateToken({ name: data.name, email: data.email });
        return { success: { name: user.name, email: user.email, token: token } }

    } catch (error) {
        throw new Error(error);
    }
}

const checkDataExistancy = async (data) => {
    try {

        let user = await User.findOne({ email: data.email });

        if (!user) {
            return { result: false }
        } else {
            return { result: true }
        }

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getUser, registerUser, loginUser, checkDataExistancy };