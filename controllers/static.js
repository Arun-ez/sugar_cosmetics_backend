
const Product = require('../models/Product');

const getStaticProducts = async () => {
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