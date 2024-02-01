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

app.get('/',
    (req, res , next) => {
        console.log('first');
        res.send('hello~');
        // next(new Error('error'));
    },
    (req, res , next) => {
        console.log('second');
    }
);


app.get('/sky/:page', async (req, res) => {
    const page = req.params.page;
    const pageSize = (page - 1) * 10;

    let sql = `SELECT * FROM TEST ORDER BY id DESC LIMIT 1, 10`;
    db.query(sql, async (err, results, fields) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results); // DB에서 가져온 데이터를 그대로 JSON으로 응답
    });
});
app.use((req,res,next) =>{
    res.status(400).send('Not avalble');
});

app.use((error, req , res , next)=>{
    console.error(error);
    res.status(500).send('Sorry try again');
});
app.listen(8080);