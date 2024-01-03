const mysql = require('mysql2');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4701',
    database: 'test'
})

connect.connect((err)=>{
    if(err){
        throw new Error('연결 실패');
    }
    console.log('연결 성공');
});