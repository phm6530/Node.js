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

const mailOpt = (who, contents , radioOption ,  yourContact) => {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: process.env.MAIL_ID,
      subject: `[${radioOption}] ${who}님의 문의사항`,
    
      html : `
            [${radioOption}]<br>
            보내신분 : ${who} <br>
            연락처 : ${yourContact} <br>
            문의내용  :  ${contents}    <br>
      `
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
        const { who ,description , radioOption , yourContact} = req.body;
        console.log(req.body);
        const mailOption = mailOpt( who ,description , radioOption , yourContact);
        await sendMail(mailOption);
        res.json({'message' : '성공'});
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
});

module.exports = router;