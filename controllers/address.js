const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const getAddressData = async (data) => {
    try {
        let response = await User.findOne({ email: data.email });
        return { data: response.addresses }
    } catch (error) {
        throw new Error(error);
    }

}

const postAddressData = async (data, payload) => {
    try {
        let response = await User.findOne({ email: data.email });
        let addresses = response.addresses;
        addresses.push({ ...payload, _id: uuidv4() });
        let address_response = await User.updateOne({ email: data.email }, { $set: { addresses: addresses } })
        return { success: address_response }
    } catch (error) {
        throw new Error(error);
    }

}

const patchAddressData = async (data, payload, params) => {
    try {
        let response = await User.findOne({ email: data.email });
        let new_addresses = response.addresses.map((elm) => {

            if (elm._id === params.id) {
                return {
                    ...elm,
                    ...payload
                }
            }

            return elm;
        })

        let address_response = await User.updateOne({ email: data.email }, { $set: { addresses: new_addresses } })
        return { success: address_response }

    } catch (error) {
        throw new Error(error);
    }

}

const deleteAddressData = async (data, params) => {
    try {
        let response = await User.findOne({ email: data.email });
        let new_addresses = response.addresses.filter((elm) => {
            return elm._id !== params.id
        })

        let address_response = await User.updateOne({ email: data.email }, { $set: { addresses: new_addresses } })
        return { success: address_response }
    } catch (error) {
        throw new Error(error);
    }

}


module.exports = { getAddressData, postAddressData, patchAddressData, deleteAddressData }