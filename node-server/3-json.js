const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(express.static('public')); // 'public' 폴더에 있는 정적 파일을 제공

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4701',
  database: 'test'
});

db.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('연결 완료');
});

// GET 요청 처리
app.get('/cols', (req, res) => {
  let sql = `SELECT * FROM TEST`;
  db.query(sql, (err, results, fields) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// POST 요청 처리
app.post('/test', (req, res) => {
  const data = req.body;
  console.log('POST : ', data.name);
  let sql = `INSERT INTO TEST(NAME) VALUE(${JSON.stringify(data.name)})`;
    db.query(sql, (err, results, fields) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
  // 여기서 데이터를 사용하거나 DB에 저장할 수 있습니다.
  
});

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});