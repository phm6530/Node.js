const bcrypt = require('bcrypt');

const passwordHashing = async(passowrd) =>{
    console.log(passowrd);
    try{
        const hashPassword = await bcrypt.hash(passowrd, 10)
        return hashPassword;
    }catch(error){
        throw new Error('비밀번호 hash 실패');
    }
}
exports.passwordHashing = passwordHashing;