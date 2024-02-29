const express = require('express');
const router = express.Router();//라우터 연결
const { verify }  = require('../util/auth'); 

const { passwordHashing } = require('../util/password');
const { validation_Reply } = require('../util/validate');
const { isDeleteReply } = require('../util/util');

// DB 연결
const util = require('util');

const db = require('../util/config');
const { NotFoundError } = require('../util/error');
db.query = util.promisify(db.query); //프로미스 생성


// 전체 숫자 세기
const getTotalCount = async() =>{
    const count_sql = `SELECT COUNT(*) AS cnt FROM board`;
    const [counter] = await db.query(count_sql);
    return counter.cnt;
}

const replyHandler = async (reqData, res, requestRoleType) => {
    const { 
        userIcon, 
        userName, 
        contents, 
        idx , 
        password = null
    } = reqData;
    console.log('page :' , requestRoleType);
    try {
        const limit = 1;
        let hashedPassword = undefined;
        let role = 0;

        // 일반 사용자의 경우 비밀번호 해싱 처리
        if(requestRoleType !== 'admin' && password) {
            hashedPassword = await passwordHashing(password);
        }else{
            role = 'admin';
        }
        
        let req_sql = `
            INSERT INTO 
            board (user_icon, user_name, user_password, contents, role , board_key, date) 
            VALUES (?, ?, ?, ?, ? , ?, NOW())`;

        await db.query(req_sql, [userIcon, userName, hashedPassword, contents, role , idx]);
        let res_sql = `
            SELECT idx, user_icon, user_name, contents, board_key, date , role
            FROM board ORDER BY idx DESC LIMIT ?`;
     
        const response = await db.query(res_sql, [limit]);
 
        const count = await getTotalCount();

        return res.status(201).json({
            path: 'board/reply',
            counter: count,
            resData: response
        });

    } catch (error) {
        // 적절한 에러 처리
        return res.status(500).json({ message: 'Database insert failed' });
    }
};

// 댓글 등록완료
router.post('/reply', validation_Reply, async (req, res, next) => {
    const reqData = req.body;
    const requestRoleType = 'user';
    try {
        // replyHandler에 필요한 모든 인자 전달
        await replyHandler(reqData , res , requestRoleType);
    } catch (error) {
        next(error);
    }
});

// 댓글 등록완료
router.post('/reply/auth', verify , validation_Reply, async (req, res, next) => {
    const reqData = req.body;
    const page = 'admin';
    try {
        await replyHandler(reqData, res , page);
    } catch (error) {
        next(error);
    }
});





router.post('/reply/delete', async(req,res,next)=>{
    const body = req.body;
    try{
        const { isDeleted  , isDeleted_key , counter } = await isDeleteReply(body);
        res.json({message: '성공' , isDeleted , isDeleted_key , counter });
    }catch(error){
        console.log(error.message);
        res.status(error.status || 500).json({message : error.message});
    }
});


// 초기로드 or 게시판 페이징
router.get('/:idx', async (req, res, next) => {

    try {
        const idx = +req.params.idx;
        console.log(idx);
        const limit  = 10;

        const sql = `select idx , 
            user_icon , 
            user_name , 
            contents , 
            board_key , 
            date ,
            role
            from board order by idx desc limit ? offset ?`;
        const response_database = await db.query(sql ,[limit , idx])

        const count_sql = `select count(*) as cnt from board`;
        const counter = await db.query(count_sql);
    
        res.status(201).json({
            path : 'paging',
            counter : counter[0].cnt,
            pageData : response_database
        });

    }
    catch (error) {
        const err = new NotFoundError()
        next(err);
    }
});


module.exports = router;