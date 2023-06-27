const Order = require('../models/Order');

const getOrdersData = async (data) => {
    try {
        let response = await Order.find({ email: data.email });
        return { data: response.reverse() }
    } catch (error) {
        throw new Error(error);
    }
}

const postOrderData = async (data, paylaod) => {

    try {
        let response = Order.create({ name: paylaod.address.name, email: data.email, ...paylaod })
        return { success: true }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getOrdersData, postOrderData }