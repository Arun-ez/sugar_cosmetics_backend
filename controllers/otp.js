const { Mail, mailer } = require('../configs/nodemailer');
const { createLimitedToken, verifyToken, VerifyToken } = require('../middlewares/token_validator');

const generateOtp = (email) => {

    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }

    return { otp, hashkey: createLimitedToken({ otp, email }) };
}

const sendOtp = async (email) => {

    if (!email) {
        throw new Error('Email Not Privided');
    }

    const { otp, hashkey } = generateOtp(email);

    const mail = new Mail(email, otp);

    try {
        let response = await mailer.sendMail(mail)
        return { status: true, hashkey };
    } catch (error) {
        throw new Error(error);
    }

}

const verifyOtp = async ({ otp, hashkey, email }) => {

    if (!otp || !hashkey || !email) {
        throw new Error('Missing signature varification fields');
    }

    try {
        let response = VerifyToken(hashkey);

        if (response.data.otp == otp && response.data.email == email) {
            return { status: true, email }
        }

        throw new Error('Invalid OTP');

    } catch (error) {
        throw new Error('Invalid OTP');
    }

}

module.exports = { sendOtp, verifyOtp }
