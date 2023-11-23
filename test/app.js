import express from 'express';
import mysql from 'mysql2';
const app = express();
// app.use(express.static('public'));

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
app.get('/', async (req, res) => {
    let sql = `SELECT * FROM TEST ORDER BY id DESC LIMIT 1, 10`;
    db.query(sql, async (err, results, fields) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(results);
        res.json(results);
    });
});

app.listen(8080, () => {
    console.log('서버가 8080 포트에서 실행 중입니다.');
});