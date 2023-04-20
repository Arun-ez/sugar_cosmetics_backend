const bcrypt = require('bcryptjs');
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
    const salt = 10;
    const response = await User.findOne({ email: data.email });

    if (response) {
        throw new Error('Account already exist');
    }

    return new Promise((resolve, reject) => {
        bcrypt.hash(data.password, salt, async (err, hashed) => {
            try {
                const response = await User.create({ ...data, password: hashed, cart: [], auth_type: "native" });
                const json = response.toJSON();
                delete json.password;
                resolve({ created: json });
            } catch (error) {
                reject(error);
            }
        })
    })
}

const loginUser = async (data) => {
    try {

        let user = await User.findOne({ email: data.email });

        if (!user) {
            throw new Error('Data not found');
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(data.password, user.password, (err, isValid) => {
                if (isValid === true) {
                    const token = CreateToken({ name: data.name, email: data.email });
                    resolve({ success: { name: user.name, email: user.email, token: token } })
                } else {
                    reject({ message: "Wrong password" })
                }
            })
        })

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