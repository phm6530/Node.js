const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');


const myMail = nodeMailer.createTransport({
    service: process.env.SERVICE,
    auth : {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
})

const mailOpt = (user_data, title, contents) => {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: process.env.MAIL_ID,
      subject: title,
      text: contents
    };
    return mailOptions;
  }

  const sendMail = async(mailOption) =>{
    try{    
        await myMail.sendMail(mailOption);
    }catch(error){
        throw new Error('메일 전송 에러' + error.message);
    }
 }

router.post('/' , async(req , res , next) =>{
    try{
        const {name , who ,description} = req.body;
        const mailOption = mailOpt(name , who ,description);
        await sendMail(mailOption);
        res.json({'message' : '성공'});
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
});

module.exports = router;