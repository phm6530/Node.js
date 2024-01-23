const joi = require('joi');


// 댓글 유효성검사
const validation_Reply = (req, res, next) =>{
    const body = req.body;
    const schema = joi.object({
        idx : joi.string().required(),
        userName : joi.string().required(),
        contents : joi.string().required(),
        password : joi.string().min(4).required(),
        page : joi.number().required(),
    })

    const { error } = schema.validate(body);
    if(error){
        return res.status(400).json({message : error.details[0].message })
    }
    next();
}


exports.validation_Reply = validation_Reply;