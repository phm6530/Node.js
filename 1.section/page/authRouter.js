const express = require('express');
const router = express.Router();

const { verify , createToken }  = require('../util/auth'); // 검증
const { isValidAdmin } = require('../util/util');

// Login Token 생성
router.post('/login', async (req, res) => {
    const { user_id, user_password } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: 'ID is missing' });
    }

    if (!user_password) {
        return res.status(400).json({ message: 'Password is missing' });
    }
    
    else{
        try{
            // ID와 비밀번호가 모두 제공된 경우
            // JWT 토큰 생성 및 응답 로직
            const admin = await isValidAdmin(user_id , user_password); // id가 할당된 User 객체를 가져오면 됨
            console.log(admin);
            
            // 외부 검증로직
            // if(!admin){
            //     return res.status(401).json({message : 'not found this guy'});
            // }
            const token = createToken(user_id);
            return res.json({ message: 'Token is Created', token: token , Auth : true});
    
        }
        catch(error){
            console.log(error);
            return res.status(error.status).json({message : error.message , Auth : false});
        }
    }
});

router.post('/logout', verify , (req, res) => {
    
    // 파일에 로그 기록
    // logger.info(`User ${req.user.id} logged out`);
    return res.status(200).send('Logged out');
});


router.post('/auth', verify, (req , res , next)=>{
        res.json({ Auth : true , message : 'Access Token'});
})



module.exports = router;