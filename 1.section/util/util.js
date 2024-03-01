const { 
    compare 
} = require('bcrypt');
const { NotFoundError } = require('./error');

//DB 연동
const util = require('util');
const db = require('../util/config');
const jwt = require('jsonwebtoken');
db.query = util.promisify(db.query); //프로미스 생성
require('dotenv').config();

const isValidAdmin = async (id, userPassword) => {
    try {
        const sql =`select password from admin_user where id = ?`;
        const response = await db.query(sql , [id] );
        
        if (response.length === 0 ) {
            throw new NotFoundError('등록된 관리자가 아닙니다.');
        }

        const responsePasword = response[0].password;
        const isMatch = await compare(userPassword, responsePasword);
        if (!isMatch) {
            throw new NotFoundError('비밀번호가 맞지않습니다.');
        }

        return true;
    } catch (error) {
        throw error; 
    }
}

const isDeleteReply = async({ reply_password , board_key ,  auth }, token) =>{
    
    let sql_ReplyFind = `select * from board where board_key = ? `;
    const boardRecord = await db.query(sql_ReplyFind, [board_key]);
    
    if(!boardRecord || boardRecord.length === 0 ){
        throw new NotFoundError('이미 삭제되었거나 서버에 문제가 있습니다.');
    }

    // 인증된 사용자면 토큰 검사해서 삭제하고 아니면 비번 검사하기
    // role 은 나중에 고려해보자 흠
    if(auth){
        try{
          jwt.verify(token , process.env.JWT_SECRET);
        }
        catch(error){
            throw new NotFoundError('유효하지 않은 토큰입니다.');
        }
    }else{
        const isMatch = await compare(reply_password , boardRecord[0].user_password);
        if(!isMatch){
            throw new NotFoundError('비밀번호가 맞지않습니다.');
        }
    }
    
    try{

        let sql_delete = `delete from board where board_key = ? `;
        const deleteResult = await db.query(sql_delete, [board_key]);
        const isDeleted = deleteResult.affectedRows > 0;

        let sql_cnt = `select count(*) as cnt from board`;
        const counter = await db.query(sql_cnt);

        return {
            isDeleted ,
            isDeleted_key : board_key,
            counter : counter[0].cnt
        }        
    }
    catch(err){
        throw err;
    }
}


exports.isValidAdmin = isValidAdmin;
exports.isDeleteReply = isDeleteReply;





