
const Product = require('../models/Product');

const getAllProducts = async () => {
    try {
        const response = await Product.find();
        return { data: response };
    } catch (error) {
        throw new Error(error);
    }
}

const getFindCriteria = (params, query) => {
    let criteria = { category: params.category }

    if (query.filter) {

        if (typeof query.filter === "string") {
            criteria = { ...criteria, filter: query.filter }
        } else {
            let arr = query.filter.map((filter) => {
                return { filter };
            })

            criteria = { ...criteria, $or: arr }
        }
    }

    return criteria;
}

const getSortCriteria = (query) => {
    let criteria = {};

    if (query.sort) {

        if (typeof query.sort === "string") {

            if (!query.order) {
                throw new Error('Order not provided');
            }

            criteria[query.sort] = query.order === "dsc" ? -1 : 1;
        } else {

            if (!query.order || typeof query.order === "string" || query.order.length < query.sort.length) {
                throw new Error('Order not provided for some sorting criteria');
            }

            for (let i = 0; i < query.sort.length; i++) {
                criteria[query.sort[i]] = query.order[i] === "dsc" ? -1 : 1;
            }
        }

    }

    return criteria;
}

const getProductsByCategory = async (params, query) => {

    try {
        const find = getFindCriteria(params, query);
        const sort = getSortCriteria(query);
        const response = await Product.find(find).sort(sort);
        return { data: response };
    } catch (error) {
        throw new Error(error);
    }
}

const getProductByCategoryAndId = async (category, id) => {
    try {
        const response = await Product.findOne({ category: category, _id: id });
        return { data: response };
    } catch (error) {
        throw new Error(error);
    }
}

const postProduct = async (data) => {
    try {
        const response = await Product.create(data);
        return response
    } catch (error) {
        throw new Error(error);
    }
}

const searchProducts = async (query) => {
    try {
        const response = await Product.find({ $text: { $search: query } })
        return { data: response };
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getAllProducts, getProductsByCategory, getProductByCategoryAndId, postProduct, searchProducts };