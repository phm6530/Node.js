const express = require('express'); // express 라이브러리 로드
const cors = require('cors'); // cors 검토
const jwt = require('jsonwebtoken');
const { verify , createToken }  = require('./util/auth'); // 검증
const jwtSecret = process.env.JWT_SECRET;


// Notice
const noticeRouter = require('./page/notcie');

const app = express();
// console.log('암호키 : ',jwtSecret);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/notice' , noticeRouter);

// Login Token 생성
app.post('/login', (req, res, next) => {
    const id = req.body.user_id;
    const password = req.body.user_password;
    

    if(!id || !password){
        return res.status(400).json({message:'Password or id Missing'});
    }
    // JWT 토큰 생성로직
    const token = createToken(id);

    //성공시
    return res.json({
        message: 'Token is Created',
        token: token
    });
});


app.get('/test/:item', verify, (req , res , next)=>{
    const param = req.params.item;
    if(!/^\d+$/.test(param)){
        const err = new Error('사용 할 수 없는 PARAMETER 입니다.');
        next(err);
    }
    else{
        res.json({ item : param });
    }
})

app.get('/test', (req , res , next)=>{
    const param = req.params.item;
    if(!/^\d+$/.test(param)){
        const err = new Error('사용 할 수 없음 ');
        next(err);
    }
    else{
        res.json({ item : param });
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack); // 서버 콘솔에 에러 로그 출력
    res.status(500).json({ message: err.message }); // 에러 메시지를 JSON 응답으로 전송
});

app.listen(8080);