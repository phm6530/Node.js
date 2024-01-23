const { 
    compare 
} = require('bcrypt');
const { readData , allBoardData , BoardData , BoardWirte} = require('./readData');
const { NotFoundError } = require('./error');

const isValidAdmin = async (id, password) => {
    try {
        const data = await readData();
        const user = data.admin.find((User) => User.email === id);

        if (!user) {
            // throw new Error('등록된 관리자가 아닙니다.');
            throw new NotFoundError('등록된 관리자가 아닙니다.');
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new NotFoundError('비밀번호가 맞지않습니다.');
        }

        return true;
    } catch (error) {
        // 여기서 에러를 처리하거나, 필요에 따라 호출한 곳으로 에러를 전파합니다.
        // console.error('Error in isValidAdmin:', error.message);
        throw error; // 에러를 다시 throw하여 호출한 곳에서 처리하도록 할 수 있습니다.
    }
}


const isDeleteReply = async( replyIdx , password , page) =>{
    try{
        const data = await allBoardData();
        const targetReley = data.find((e) => e.idx === replyIdx);
        if(!targetReley){
            throw new NotFoundError('이미 삭제되었거나 서버에 문제가 있습니다.');
        }
        const isMatch = await compare(password , targetReley.hashedPassword);

        if(!isMatch){
            throw new NotFoundError('비밀번호가 맞지않습니다.');
        }
        const newObject = data.filter((e)=>{
            return e.idx !== replyIdx;
        });
        await BoardWirte(newObject);

        const newReplyPage = await BoardData(page);
        console.log('newReplyPage : ' ,  newReplyPage)
        return newReplyPage;

    }catch(err){
        throw err;
    }
}


exports.isValidAdmin = isValidAdmin;
exports.isDeleteReply = isDeleteReply;





