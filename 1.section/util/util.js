const { 
    compare 
} = require('bcrypt');
const { readData} = require('./readData');
const { NotFoundError } = require('./error');

//DB 연동
const util = require('util');
const db = require('../util/config');
db.query = util.promisify(db.query); //프로미스 생성


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




const isDeleteReply = async({ reply_password , board_key }) =>{

    // const limit = 10;
    // const offset = ((page || 1 ) - 1) * 10
    try{
        let sql_ReplyFind = `select * from board where board_key = ? `;
        const boardRecord = await db.query(sql_ReplyFind, [board_key]);
        
        if(!boardRecord || boardRecord.length === 0 ){
            throw new NotFoundError('이미 삭제되었거나 서버에 문제가 있습니다.');
        }
        const isMatch = await compare(reply_password , boardRecord[0].user_password);
        if(!isMatch){
            throw new NotFoundError('비밀번호가 맞지않습니다.');
        }

            let sql_delete = `delete from board where board_key = ? `;
            const deleteResult = await db.query(sql_delete, [board_key]);
            const isDeleted = deleteResult.affectedRows > 0;

            console.log('deleteResult', deleteResult);
            console.log('isDelete', isDeleted);
            // let sql_NewArry = `select idx, user_name , contents , board_key from board order by idx desc limit ? offset ?`;
            // const newArray = await db.query(sql_NewArry, [limit , offset]);

            let sql_cnt = `select count(*) as cnt from board`;
            const counter = await db.query(sql_cnt);

            // console.log(newArray);
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





