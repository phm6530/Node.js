const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const mysql = require('mysql2');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인에서의 요청을 허용
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4701',
  database: 'test'
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return; 
  }
  console.log('연결');

  // INSERT 쿼리 실행
  let sql = `INSERT INTO TEST(NAME) VALUES('HYUNMIN')`;
  db.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log('데이터 삽입 결과:', results);
    }

    // MySQL 연결 종료
    db.end();
  });
});
server.listen(8080, () => {
  console.log('서버가 8080 포트에서 실행 중입니다.');
});