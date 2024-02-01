const express = require('express');
const router = express.Router();

const util = require('util');

const { NotFoundError } = require('../util/error'); //에러 인스턴스 

const db = require('../util/config'); //DB 연결
db.query = util.promisify(db.query); //DB 프로미스 생성


router.get('/', async(req,res,next)=>{
    const limit = 10;
    try{
        const sql = `select * from project order by id desc limit ?`;
        const response = await db.query(sql , [limit]);
        
        const responseSkillArr = response.map((item) => {
            return {
                ...item,
                skill: typeof item.skill === 'string' ? item.skill.split(',') : []
            };
        });

        res.status(200).json({
                resData : responseSkillArr
        })
    }
    catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }
});


router.post('/add' , async(req, res , next)=>{
    const { idx , title, skill, projectUrl, description , company , startDate, endDate } = req.body;
    
    const typeString_skill = skill.join();
    const formatingStartDate = startDate.split('T')[0]
    const endStartDate = endDate.split('T')[0]

    try{
        let sql = `INSERT INTO project (
            project_key,
            title,
            company,
            skill,
            description,
            startProject,
            endProject,
            project_url
        ) 
        VALUES (
            ?,?,?,?,?,?,?,?
        )`;
        await db.query(sql , [idx , title, company,  typeString_skill , description , formatingStartDate, endStartDate , projectUrl ]);
        res.status(200).json({message: 'success'});
    }
    catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }
});



module.exports = router;