const jwt = require('jsonwebtoken');
//sign = JWT 생성 //verify = JWT 검증

//Token 검증 로직
const verify = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message : '인증 실패'});
    try{
        const decoded = jwt.verify(token , 'jwtSecret');
        req.user = decoded;
        console.log(decoded);
        next();
    }
    catch(error){
        console.error(error);
        res.status(400).json({message : 'Token error'});
    }
}

const createToken = (id)=>{
    return jwt.sign({ id: id }, 'jwtSecret', 
    {
        expiresIn: '1h' // 토큰 유효시간 설정
    }
);
}

exports.verify = verify;
exports.createToken = createToken;