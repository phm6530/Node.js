const { 
    compare 
} = require('bcrypt');
const { readData } = require('./readData');

const isValidAdmin = async (id, password) => {
    try {
        const data = await readData();
        const user = data.admin.find((User) => User.email === id);

        if (!user) {
            throw new Error('등록된 관리자가 아닙니다.');
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new Error('비밀번호가 맞지않습니다.');
        }

        return true;
    } catch (error) {
        // 여기서 에러를 처리하거나, 필요에 따라 호출한 곳으로 에러를 전파합니다.
        console.error('Error in isValidAdmin:', error.message);
        throw error; // 에러를 다시 throw하여 호출한 곳에서 처리하도록 할 수 있습니다.
    }
}

exports.isValidAdmin = isValidAdmin;





