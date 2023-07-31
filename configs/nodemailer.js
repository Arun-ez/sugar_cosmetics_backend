const { createTransport } = require('nodemailer');

class Mail {
    constructor(receiver, otp) {
        this.from = `"Sugar Cosmetics" <${process.env.OTP_EMAIL_ID}>`
        this.to = receiver
        this.subject = `OTP Verification`
        this.html = `<body><style>*{font-family:system-ui}body{margin:0;background-color:#f2f2f2}div{gap:12px;padding:20px;width:600px;display:flex;flex-direction:column;margin:20px auto;border:1px solid rgb(190,195,224,.2)}image{width:100%}p{margin:0}</style><div><img src="https://ci6.googleusercontent.com/proxy/UkvcZG52LAE3wptGyfr5G7lP9G_YqVeZeoXEQMNNDNawHz5hHcM3JBB690s8EfJGHOd1ea4exfxIDo7D1-kK66wqAT5K34f2hQx0eKW0Q1sLrA8=s0-d-e1-ft#https://d32baadbbpueqt.cloudfront.net/email/OrderConfirmed_1.jpg"><p>To complete your Signin/Signup process, and as an additional security measure, you are requested to enter the one-time password (OTP) provided in this email.</p><p style="font-size:25px;font-weight:500">Your OTP Code is :<span style="font-weight:700">${otp}</span></p><p>This OTP is valid for 5 minutes only</p><hr style="border:1px solid rgb(190,195,224,.1);width:100%"><span>Don't Share this OTP with anyone, use this OTP to successfully singin/singup</span><span>if you haven't requested for this OTP, please igonore this message<span></div></body>`
    }
}


/*
* Connecting with SMTP Servers
* password is genereated through App Password from Gmail
*/
const mailer = createTransport({
    service: "gmail",
    auth: {
        user: process.env.OTP_EMAIL_ID, // Gmail id
        pass: process.env.OTP_EMAIL_PASSWORD //Google App passwords only not normal account password
    }
});


module.exports = { Mail, mailer }