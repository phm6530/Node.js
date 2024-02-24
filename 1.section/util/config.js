const mysql = require('mysql2');
//.env 파일 읽기

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect((err) => {
    if (err) {
        console.error('연결 실패:', err.message);
        // 여기서 에러를 처리하고 필요한 동작을 수행하세요.
    } else {
        console.log('연결 성공');
    }
});

module.exports = db;

