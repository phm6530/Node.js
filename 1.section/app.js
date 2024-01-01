const express = require('express'); // express 라이브러리 로드
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/test/:item', (req , res , next)=>{
    const param = req.params.item;
    if(!/^\d+$/.test(param)){
        const err = new Error('사용 할 수 없는 PARAMETER 입니다.');
        next(err);
    }
    else{
        res.json({ item : param });
    }
})

app.get('/tester/:item', (req , res , next)=>{
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