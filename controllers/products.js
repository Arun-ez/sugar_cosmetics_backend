
const Product = require('../models/Product');

const getAllProducts = async ({ limit, page }) => {

    let skip = page && page > 1 ? (page - 1) * (limit || 0) : 0;

    try {
        const response = await Product.find().limit(limit || 0).skip(skip);
        const total = await Product.count();
        return { data: response, page: Number(page) || 1, total_pages: Math.ceil(total / limit) || 1 };
    } catch (error) {
        throw new Error(error);
    }
}

const postProduct = async (data) => {
    try {
        const response = await Product.create(data);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

const patchProduct = async (data, id) => {
    try {
        const response = await Product.updateOne({ _id: id }, { $set: { ...data } });
        return response;
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

const searchCriteria = (query) => {
    let criteria = { $text: { $search: query.q } }

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

const searchProducts = async (query) => {

    const sort_criteria = {
        asc: { price: 1 },
        dsc: { price: -1 }
    }

    const find_criteria = searchCriteria(query);

    try {
        const response = await Product.find(find_criteria).sort(sort_criteria[query.sort] || {})
        return { data: response };
    } catch (error) {
        throw new Error(error);
    }
}

const getProductsProgress = async () => {
    try {
        let all = await Product.count({});
        let lips = await Product.count({ category: "lips" });
        let eyes = await Product.count({ category: "eyes" });
        let face = await Product.count({ category: "face" });
        let nails = await Product.count({ category: "nails" });
        let skincare = await Product.count({ category: "skincare" });
        let accessories = await Product.count({ category: "accessories" });
        let kits = await Product.count({ category: "kit" });
        let seller = await Product.count({ category: "seller" });
        let newly = await Product.count({ category: "new" });

        const data = [
            { name: "All", items: all, progress: 100, path: "/" },
            { name: "Lips", items: lips, progress: Math.round((lips * 100) / all), path: "/collections/lips" },
            { name: "Eyes", items: eyes, progress: Math.round((eyes * 100) / all), path: "/collections/eyes" },
            { name: "Face", items: face, progress: Math.round((face * 100) / all), path: "/collections/face" },
            { name: "Nails", items: nails, progress: Math.round((nails * 100) / all), path: "/collections/nails" },
            { name: "Skincare", items: skincare, progress: Math.round((skincare * 100) / all), path: "/collections/skincare" },
            { name: "Accessories", items: accessories, progress: Math.round((accessories * 100) / all), path: "/collections/accessories" },
            { name: "Gifts And Kits", items: kits, progress: Math.round((kits * 100) / all), path: "/collections/kit" },
            { name: "Best Seller", items: seller, progress: Math.round((seller * 100) / all), path: "/collections/seller" },
            { name: "New Launches", items: newly, progress: Math.round((newly * 100) / all), path: "/collections/new" },
        ]

        return { data }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { postProduct, patchProduct, getAllProducts, getProductsByCategory, getProductByCategoryAndId, searchProducts, getProductsProgress };