const User = require('../models/User');

const getOrdersData = async (data) => {
    try {
        let response = await User.findOne({ email: data.email });
        return { data: response.orders }
    } catch (error) {
        throw new Error(error);
    }
}

const postOrderData = async (data, paylaod) => {
    try {
        let response = await User.findOne({ email: data.email });
        let orders = response.orders;
        orders.push(paylaod);
        let order_response = await User.updateOne({ email: data.email }, { $set: { orders: orders } });
        return { success: paylaod }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getOrdersData, postOrderData }