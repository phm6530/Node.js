const express = require('express');


// body parser 
const bodyParser = require('body-parser');

const app = express();
const path = require('path');

// root Path 설정
const rootPath =require('./util/path')

// 라우터 로드
const adminRouter = require( './routes/admin' );
const userRouter = require( './routes/shop' );
const authRouter = require( './routes/auth' );

app.set('view engine' , 'ejs');
app.set('views', 'views'); 

app.use(express.static(path.join( __dirname , 'public' )));//정적 파일 로드

// 본문 분석기 모듈 사용
app.use(bodyParser.urlencoded({extended:false}));

app.use( '/admin' , adminRouter );
app.use( userRouter );
app.use( authRouter );

const errorController = require('./controllers/error');


app.use(errorController.get404page);


// const server = http.createServer(app);
app.listen(3000);
