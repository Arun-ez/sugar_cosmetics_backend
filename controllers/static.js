
const Product = require('../models/Product');

const getStaticProducts = async () => {

    const data = [
        { title: 'BESTSELLERS', type: 'seller', data: null },
        { title: 'JUST-IN', type: 'eyes', data: null },
        { title: 'BUY NOW PAY LATER', type: 'face', data: null },
        { title: 'GIFTING', type: 'kit', data: null },
        { title: 'SUPER SAVERS', type: 'accessories', data: null },
        { title: 'SKINCARE BASICS', type: 'skincare', data: null },
    ]

    for (let i = 0; i < data.length; i++) {
        let products = await Product.find({ category: data[i].type });
        data[i].data = products;
    }

    return { data }
}

module.exports = { getStaticProducts };