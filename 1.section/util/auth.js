const jwt = require('jsonwebtoken');
const { NotFoundError } = require('./error');
//sign = JWT 생성 //verify = JWT 검증

require('dotenv').config();//.env 파일 읽기

//Token 검증 로직
const verify = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) throw new NotFoundError('권한이 없습니다.');
    try{
        jwt.verify(token , process.env.JWT_SECRET);
        next();
    }
    catch(error){
        return res.json({ Auth : false ,  message : 'Not Access Token or Missing Token' });
    }
}

// 토근생성
const createToken = (id)=>{
    return jwt.sign({ id: id }, process.env.JWT_SECRET, 
    {
        expiresIn: '5h' // 토큰 유효시간 설정
    });
}

// 인증 확인 로직
exports.verify = verify;

// 토큰발급
exports.createToken = createToken;