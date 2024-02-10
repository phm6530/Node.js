const express = require('express');
const router = express.Router();//라우터 연결
// const { verify }  = require('../util/auth'); 

const { passwordHashing } = require('../util/password');
const { validation_Reply } = require('../util/validate');
const { isDeleteReply } = require('../util/util');



// DB 연결
const util = require('util');

const db = require('../util/config');
const { NotFoundError } = require('../util/error');
db.query = util.promisify(db.query); //프로미스 생성


// 댓글 등록완료
router.post('/reply' ,  validation_Reply,  async(req, res, next) =>{
    const { userIcon , userName , contents , password , idx , page } = req.body; 
    console.log(req.body);
    const limit = 1;
    // const dbOffset = (page - 1) * limit;
    
    try{
        const hashedPassword = await passwordHashing(password);//비밀번호 해싱하기
        
        let req_sql = 
        `INSERT INTO 
        board (user_icon , user_name , user_password , contents , board_key ,date) 
        value (?,?,?,?,? , NOW())`;
        await db.query(req_sql , [ userIcon , userName , hashedPassword , contents , idx]); //반영

        let res_sql = `
            SELECT idx ,
            user_icon ,  
            user_name , 
            contents , 
            board_key , 
            date 
            FROM board ORDER BY idx DESC LIMIT ?`;
        const response = await db.query(res_sql , [limit]); //리턴데이터
        const count_sql = `select count(*) as cnt from board`;
        const counter = await db.query(count_sql);


        res.status(201).json({
            path : 'board/reply',
            counter : counter[0].cnt,
            resData : response
        });

    }   
    catch(error){
        const err = new NotFoundError('database insert falied');
        next(err)
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
            date 
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