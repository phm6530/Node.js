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
app.get('/cols', async (req, res) => {
  let sql = `SELECT count(*) as total FROM TEST`;
  db.query(sql,  async (err, results, fields) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const page = req.query.page; // 페이지 번호
    const pageSize = 10; // 한 페이지에 표시될 아이템 수

    const offset = (page - 1) * pageSize;

    const tenPage = `SELECT * FROM TEST ORDER BY id DESC LIMIT ${offset}, ${pageSize}`;

    console.log(tenPage);

    db.query(tenPage , (tenError, Tenresult)=> {
      if(tenError){
        console.log(tenError.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const duobleResult = {
        total : results[0].total ,
        data : Tenresult 
      }
      res.json(duobleResult);
    });
    
  });
});

app.get('/noticeData',(req, res) =>{
  const idx = req.query.idx; 
  let sql = `select * from test where id = ${idx};`
  db.query(sql,  async (err, results, fields) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({error : '서버에러'});
    }
    else{
      res.json(results);
    }
      
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

// POST 요청 처리
app.post('/delete', (req, res) => {
  const data = req.body;
  console.log('POST : ', data.id);
  let sql = `delete from test where id = '${JSON.stringify(data.id)}'`;
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