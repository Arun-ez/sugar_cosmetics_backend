
const Product = require('../models/Product');

const getAllProducts = async () => {
    try {
        const response = await Product.find();
        return { data: response };
    } catch (error) {
        throw new Error('Data not found');
    }
}

const getProductById = async (id) => {
    try {
        const response = await Product.findOne({ _id: id });
        return { data: response };
    } catch (error) {
        throw new Error('Data not found');
    }
}

module.exports = { getAllProducts, getProductById };