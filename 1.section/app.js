
const express = require('express'); // express 라이브러리 로드
const cors = require('cors'); // cors 검토
const { verify , createToken }  = require('./util/auth'); // 검증
const { isValidAdmin } = require('./util/util');

// DB 연결
const dbConnect = require('./util/config');

// Notice
const boardRouter = require('./page/notcie');

const app = express();
// console.log('암호키 : ',jwtSecret);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// 게시판 로직
app.use('/board' , boardRouter);


// Login Token 생성
app.post('/login', async (req, res) => {
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

app.post('/logout', verify , (req, res) => {
    
    // 파일에 로그 기록
    // logger.info(`User ${req.user.id} logged out`);
    return res.status(200).send('Logged out');
});


app.post('/auth', verify, (req , res , next)=>{
        res.json({ Auth : true , message : 'Access Token'});
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

// 에러 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack); // 서버 콘솔에 에러 로그 출력
    res.status(err.status).json({ message: err.message }); // 에러 메시지를 JSON 응답으로 전송
});

app.listen(8080);