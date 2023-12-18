const nodemailer = require("nodemailer")
const errorHandler = require("../utils/errorHandler")

exports.sendmail = (req,res,next,url)=>{
    const transport =nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gamil.com",
        post:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,    
            pass:process.env.MAIL_PASSWORD,
        }
    })
    const mailOptions ={
        from : "Master Private Limited",
        to: req.body.email, 
        subject: "password reset link",
        // text:"do not share this link",
        html: `<h1>Click link below to reset password</h1>
            <a href="${url}"></a>`
    }
    transport.sendMail(mailOptions,(err,info)=>{
        if(err) {
            return next(new errorHandler(err,404))
        }
        // console.log(info);
        return res.status(200).json({
            message:"mail sent successfully",
            url
        })
    })
}
