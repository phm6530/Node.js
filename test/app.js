import express from 'express';
import mysql from 'mysql2';
const app = express();
app.use(express.static('public'));

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

app.get('/notice', async (req, res) => {
    let TotalSql = `SELECT count(*) as total FROM TEST`;
    db.query(TotalSql, async (err, results, fields) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // console.log(results);
        let pageSql = `SELECT * FROM TEST ORDER BY id DESC`;
        // let pageSql = `SELECT * FROM TEST ORDER BY id DESC LIMIT 1, 10`;
        db.query(pageSql, (errPage, resultPage )=>{
            if(errPage) {
                console.error(errPage);
                return res.status(500).json({erro: 'DB Connect error'});
            }
            console.log(resultPage);
            const noticeData = {
                total: results,
                arr : resultPage
            }
            return res.status(200).json(noticeData);
        });
    });
});

app.listen(8080, () => {
    console.log('서버가 8080 포트에서 실행 중입니다.');
});