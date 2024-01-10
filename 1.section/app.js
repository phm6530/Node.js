const express = require('express'); // express 라이브러리 로드
const cors = require('cors'); // cors 검토
const jwt = require('jsonwebtoken');
const { verify , createToken }  = require('./util/auth'); // 검증
const jwtSecret = process.env.JWT_SECRET;
console.log('jwtSecret :', jwtSecret);

// DB 연결
const dbConnect = require('./util/config');

// const winston = require('winston');
// const logger = winston.createLogger({
//     level : 'info',
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//     ),
//     transports:[
//         new winston.transports.File({filename: '/log/logfile.log'})
//     ]
// })


// Notice
const noticeRouter = require('./page/notcie');

const app = express();
// console.log('암호키 : ',jwtSecret);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// 게시판 로직
app.use('/notice' , noticeRouter);


// Login Token 생성
app.post('/login', (req, res) => {
    const { user_id, user_password } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: 'ID is missing' });
    }

    if (!user_password) {
        return res.status(400).json({ message: 'Password is missing' });
    }
    
    // ID와 비밀번호가 모두 제공된 경우
    // JWT 토큰 생성 및 응답 로직
    const token = createToken(user_id);
    return res.json({ message: 'Token is Created', token: token });
});

app.post('/logout', verify , (req, res) => {
    
    // 파일에 로그 기록
    logger.info(`User ${req.user.id} logged out`);
    return res.status(200).send('Logged out');
});


app.post('/test/:item', verify, (req , res , next)=>{
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