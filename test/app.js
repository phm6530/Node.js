import express from 'express';
import mysql from 'mysql2';
const app = express();
import bodyParser from 'body-parser';

app.use(express.static('public'));
app.use(bodyParser.json());

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

app.get('/notice/:page', async (req, res) => {
    const page = req.params.page || 1;
    const viewItemPage = 10;
    const offset = (page - 1) * viewItemPage;
    

    let TotalSql = `SELECT count(*) as total FROM TEST`;
    db.query(TotalSql, async (err, results, fields) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // console.log(results);
        // let pageSql = `SELECT * FROM TEST ORDER BY id DESC`;
        let pageSql = `SELECT * FROM TEST ORDER BY id DESC LIMIT ${offset}, ${viewItemPage}`;
        db.query(pageSql, (errPage, resultPage )=>{
            if(errPage) {
                console.error(errPage);
                return res.status(500).json({erro: 'DB Connect error'});
            }
            console.log(resultPage);
            const noticeData = {
                total: results[0].total,
                arr : resultPage
            }
            return res.status(200).json(noticeData);
        });
    });
});

app.post('/write', (req, res) => {
    const name = req.body.name;

    // Check if the name is provided
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Execute the SQL query to insert a new record
    const insertSql = 'INSERT INTO test (name) VALUES (?)';
    db.query(insertSql, [name], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return the result to the client
        res.json({ success: true, message: '글이 성공적으로 등록되었습니다.', data: result });
    });
});

app.listen(8080, () => {
    console.log('서버가 8080 포트에서 실행 중입니다.');
});