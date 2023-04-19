const User = require('../models/User');

const getCartData = async (data) => {
    try {
        let response = await User.findOne({ email: data.email });
        return { data: response.cart }
    } catch (error) {
        throw new Error(error);
    }
}

const cart_data_handler = (data, cart) => {

    let isExist = false;

    let new_data = cart.map((elm) => {
        if (elm._id === data._id) {
            elm.qty = elm.qty + 1;
            isExist = true;
        }

        return elm;
    }) || [];

    if (!isExist) {
        new_data.push({ ...data, qty: 1 });
    }

    return new_data;
}

const postCartData = async (data, body) => {
    try {
        let response = await User.findOne({ email: data.email });
        let cart = response.cart;
        let new_cart = cart_data_handler(body, cart);
        let cart_response = await User.updateOne({ email: data.email }, { $set: { cart: new_cart } });
        return { success: body }
    } catch (error) {
        throw new Error(error);
    }
}

const patch_cart_data_handler = (cart, body, id) => {
    let new_data = cart.map((elm) => {
        if (elm._id === id) {
            return {
                ...elm,
                qty: body.qty || elm.qty
            }
        }

        return elm;
    }) || [];

    return new_data;
}

const patchCartData = async (data, body, params) => {

    if (!params.id) {
        throw new Error('Id not provided');
    }

    try {
        let cart_data = await getCartData(data);
        let new_data = patch_cart_data_handler(cart_data.data, body, params.id);
        let cart_response = await User.updateOne({ email: data.email }, { $set: { cart: new_data } });
        return { success: cart_response }
    } catch (error) {
        throw new Error(error);
    }
}

const delete_cart_data_handler = (cart, id) => {
    let new_data = cart.filter((elm) => {
        return elm._id !== id;
    }) || [];

    return new_data;
}

const deleteCartData = async (data, params) => {

    if (!params.id) {
        throw new Error('Id not provided');
    }

    try {
        let cart_data = await getCartData(data);
        let new_data = delete_cart_data_handler(cart_data.data, params.id);
        let cart_response = await User.updateOne({ email: data.email }, { $set: { cart: new_data } });
        return { success: cart_response }
    } catch (error) {
        throw new Error(error);
    }
}

const clearCartData = async (data) => {
    try {
        let cart_response = await User.updateOne({ email: data.email }, { $set: { cart: [] } });
        return { success: "cleared" }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getCartData, postCartData, patchCartData, deleteCartData, clearCartData }