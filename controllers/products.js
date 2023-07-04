
const { VerifyToken } = require('../middlewares/token_validator');
const Product = require('../models/Product');
const User = require('../models/User');

const getProducts = async (query, authorization) => {

    const banners = {
        lips: "https://sugar-mobile-application.s3.amazonaws.com/collection-web-banner/Lips.jpg",
        eyes: "https://d32baadbbpueqt.cloudfront.net/Collection/5a16ce4f-1b39-48bf-9e5f-42d7dc8e2d66.jpg",
        face: "https://sugar-mobile-application.s3.amazonaws.com/collection-web-banner/Face.jpg",
        nails: "https://d32baadbbpueqt.cloudfront.net/Collection/b69b03ce-2d02-4223-a318-33b5abb2be53.gif",
        skincare: "https://d32baadbbpueqt.cloudfront.net/Collection/4335c634-172e-42de-96de-4d01f585d685.jpg",
        seller: "https://d32baadbbpueqt.cloudfront.net/Collection/72d09a6a-2f85-4337-a4d5-b5807ad2c9c6.jpg",
        new: "https://d32baadbbpueqt.cloudfront.net/Collection/6fca01a2-8f3f-465b-a29b-7933fe0d4ccc.jpg",
        accessories: "https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9723d8e3-9e99-459f-acfe-4ef93089e9ef.jpg&w=1920&q=75",
        kit: "https://d32baadbbpueqt.cloudfront.net/Collection/dc9fc0b7-9b57-4b8f-ae5c-42a0be0af8fb.jpg"
    }

    const possibilities = { default: {}, asc: { price: 1 }, dsc: { price: -1 } }

    const category = query.category;
    const filter = query.filter?.split('%');
    const sort = possibilities[query.sort];
    const token = authorization.split(' ')[1];

    const user_data = token ? VerifyToken(token) : null;

    const find_criteria = () => {

        const criteria = {}

        if (category) {
            criteria.category = category;
        }

        if (filter?.length && filter[0] !== "") {
            criteria.filter = { $in: filter };
        }

        return criteria;
    }

    const getWishlistStatus = (data, wishlist) => {

        let result = data.map(({ _id }) => {

            let track = wishlist.find((useritem) => {
                return useritem._id == _id;
            })

            if (track) {
                return true;
            }

            return false;
        })

        return result;
    }

    const set = new Set();

    try {
        const response = await Product.find(find_criteria()).sort(sort || {});
        const filters = (await Product.find({ category }).select('filter')).forEach(({ filter }) => {
            set.add(filter)
        })


        if (user_data?.data) {
            let { wishlist } = await User.findOne({ email: user_data.data.email }).select('wishlist');
            const status = getWishlistStatus(response, wishlist);
            return { data: response, banner: banners[category] || '', filters: Array.from(set), wishlist: status };
        }

        return { data: response, banner: banners[category] || '', filters: Array.from(set), wishlist: new Array(response.length).fill(false) };

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

    return { ...criteria, visibility: true };
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

    return { ...criteria, visibility: true };
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


module.exports = { postProduct, patchProduct, getProducts, getProductsByCategory, getProductByCategoryAndId, searchProducts };