const User = require('../models/User');

const getWishlistData = async (data) => {
    try {
        let response = await User.findOne({ email: data.email });
        return { data: response.wishlist }
    } catch (error) {
        throw new Error(error)
    }

}

const wishlist_data_handler = (data, wishlist) => {

    let isExist = false;

    let new_data = wishlist.map((elm) => {
        if (elm._id === data._id) {
            isExist = true;
        }

        return elm;
    }) || [];

    if (!isExist) {
        new_data.push(data);
    }

    return new_data;
}

const postWishlistData = async (data, body) => {
    try {
        let response = await User.findOne({ email: data.email });
        let wishlist = response.wishlist;
        let new_wishlist = wishlist_data_handler(body, wishlist);
        let wishlist_response = await User.updateOne({ email: data.email }, { $set: { wishlist: new_wishlist } });
        return { success: wishlist_response };
    } catch (error) {
        throw new Error(error)
    }
}

const delete_wishlist_data_handler = (wishlist, id) => {

    console.log(id)
    let new_data = wishlist.filter((elm) => {
        return elm._id !== id;
    }) || [];

    return new_data;
}

const deleteWishlistData = async (data, params) => {

    if (!params.id) {
        throw new Error('Id not provided');
    }

    try {
        let response = await User.findOne({ email: data.email });
        let wishlist = response.wishlist;
        let new_wishlist = delete_wishlist_data_handler(wishlist, params.id);
        let wishlist_response = await User.updateOne({ email: data.email }, { $set: { wishlist: new_wishlist } })
        return { success: wishlist_response };
    } catch (error) {
        throw new Error(error)
    }
}

const isExist = async (data, params) => {
    try {
        let response = await User.findOne({ email: data.email });
        let wishlist = response.wishlist;
        const status = wishlist.find((elm) => { return elm._id === params.id })
        if (status) {
            return { status: true };
        }

        return { status: false };

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { getWishlistData, postWishlistData, deleteWishlistData, isExist }
