const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABAS
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

