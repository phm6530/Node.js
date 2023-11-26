const express = require('express');

// body parser 
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

// root Path 설정
const rootPath =require('./util/path')

// 라우터 로드
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/shop');

app.use(express.static(path.join(__dirname , 'public') ));//정적 파일 로드


// 본문 분석기 모듈 사용
app.use(bodyParser.urlencoded({extended:false}));
app.use('/admin',adminRouter);
app.use(userRouter);

app.use((req,res)=>{
    // res.send('404 Not Found');
    // res.sendStatus(404);\
    res.status(404).sendFile(path.join(rootPath, 'views' , '404.html'));
});

// const server = http.createServer(app);
app.listen(3000);