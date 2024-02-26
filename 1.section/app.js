const express = require('express'); // express 라이브러리 로드
const cors = require('cors'); // cors 검토
require('dotenv').config();

// Notice
const boardRouter = require('./page/notcie'); // Board
const projectRouter = require('./page/project'); //프로젝트
const scheduleRouter = require('./page/schedule'); //스케줄
const authRouter = require('./page/authRouter'); //login logout 로직
const mailModuleRouter = require('./page/mailModule');// 메일보내기


const app = express();
// console.log('암호키 : ',jwtSecret);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// 게시판 로직
app.use('/board' , boardRouter);
app.use('/project' , projectRouter);
app.use('/schedule' ,scheduleRouter);
app.use(authRouter);
app.use('/mailModule', mailModuleRouter);



// 테스트 미들웨어
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

// 에러 미들웨어
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.status).json({ message: err.message }); // 에러 메시지를 JSON 응답으로 전송
});

app.listen(8080);