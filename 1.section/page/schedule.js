const express = require('express');
const router = express.Router();
const { NotFoundError } = require('../util/error'); // 에러 인스턴스 설정

// DB연결
const db = require('../util/config');
const util = require('util'); //Util 

db.query = util.promisify(db.query);

// 데이터 가져오기
router.get('/' , async(req,res, next ) =>{   
    const { Year , month } = req.query;
    try{
        const sql = `
            SELECT 
            id, 
            work, 
            complete, 
            schedule_key, 
            DATE_FORMAT(schedule_date, '%Y-%m-%d') AS formatted_date, 
            important  
            FROM schedules 
            WHERE YEAR(schedule_date) = ? AND MONTH(schedule_date) = ?
        `

        const response = await db.query(sql,[ Year , month ]);
        const restResponseData = {}

        for(const item in response){
            const data = response[item].formatted_date;
            if(!restResponseData[data]){
                restResponseData[data] = []
            }
            restResponseData[data].push(response[item]);
        }

        res.json({message : '성공' , restResponseData});
    }catch(error){
        const err = new NotFoundError('에러입니다.');
        next(err);
    }
});

// insert 
router.post('/add' , async(req,res, next ) =>{   
    const {schedule_date , work , schedule_key , important} = req.body;
    console.log(req.body);
    try{
        const sql = `insert into schedules(schedule_date , work , schedule_key , important) 
        value(?,?,?,?)`;
        const response = await db.query(sql , [schedule_date , work , schedule_key , important]);
        res.json({message : 'success' , databaseInsert : response.affectedRows});
    }catch(error){
        const err = new NotFoundError('에러입니다.');
        next(err)
    }
});

// upDate
router.post('/edit' , async(req,res, next ) =>{   
    const {work , schedule_key} = req.body;
    try{
        const sql = `update schedules set work = ? where schedule_key = ?`;
        const response = await db.query(sql , [work , schedule_key]);
        res.json({message : 'success' , databaseInsert : response.affectedRows});
    }catch(error){
        const err = new NotFoundError('에러입니다.');
        next(err)
    }
});

// delete
router.post('/delete' , async(req,res, next ) =>{   
    try{
        const { schedule_key } = req.body;
        console.log(schedule_key);
        const sql = `delete from schedules where schedule_key = ?`;
        const response = await db.query(sql , [schedule_key]);
        if(response.affectedRows === 0){
            throw new Error('삭제되지 않았습니다 재시도 해주세요.');
        }
        res.json({message : 'success' , databaseInsert : response.affectedRows});
    }catch(error){
        const err = new NotFoundError(error.message);
        next(err)
    }
});

// Complete Toggle
router.post('/complete' , async(req,res, next ) =>{   
    try{
        const { schedule_key } = req.body;
        const sql = `update schedules set complete = Not complete where schedule_key = ?`;
        const response = await db.query(sql , [schedule_key]);
        if(response.affectedRows === 0){
            throw new Error('변경되지 않았습니다 재시도 해주세요.');
        }
        res.json({message : 'success' , databaseInsert : response.affectedRows});
    }catch(error){
        const err = new NotFoundError(error.message);
        next(err)
    }
});

module.exports = router;