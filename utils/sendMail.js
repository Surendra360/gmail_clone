const nodemailer = require("nodemailer")

exports.sendMail = (req,res)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        host: "smtp.gmail.com",
        auth:{
            user: "surendrakeerbaniya@gmail.com",
            pass: "ntlkpxkxqqxrvzyh"
        }
    })
    const mailOptions = {
        from: "surendra pvt. ltd. <surendrakeerbaniya@gmail.com>",
        to: req.body.email,
        subject: "Welcome to our website",
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err) return res.send(err);
        return res.send();
    })
}
