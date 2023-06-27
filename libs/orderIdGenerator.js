const generate = () => {
    const prefix = 'SCR';
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const orderID = `${prefix}-${randomNum}`;

    return orderID;
}

module.exports = { generate }