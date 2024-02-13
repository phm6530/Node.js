const express = require('express');
const router = express.Router();

const util = require('util');
const { NotFoundError } = require('../util/error'); //에러 인스턴스 

const db = require('../util/config'); //DB 연결
db.query = util.promisify(db.query); //DB 프로미스 생성


router.get('/', async(req,res,next)=>{
    // const limit = 10;
    try{
        const sql = `select * from project order by id desc`;
        const response = await db.query(sql);
        
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


router.post('/edit' , async(req, res , next)=>{
    try{
        const { key } = req.body;
        const sql = 'select * from project where project_key = ?';
        const response = await db.query(sql , [key]);
        res.status(200).json(response[0]);

    }catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }
})

router.post('/editProject' , async(req, res , next)=>{
    try{
        const { key, title, company , description , projectUrl , skill , startDate , endDate }= req.body;
        console.log(req.body);

        const string_skill = skill.join();
        const string_StartDate = startDate.split('T')[0]
        const string_EndDate = endDate.split('T')[0]
    
        const sql = `update project set 
        title = ? , 
        company = ?, 
        skill = ? , 
        description = ?, 
        startProject = ? , 
        endProject = ?, 
        project_url = ? 
        where project_key = ?`;
        const response = await db.query(sql , [title , company , string_skill , description , string_StartDate ,string_EndDate ,projectUrl , key]);
        console.log(response);
        res.status(200).json({resData : response[0] , Message : '수정되었습니다.'});

    }catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }
})

router.delete('/delete/:key' , async(req, res , next)=>{
    
    try{
        const param = req.params.key;
        console.log(param);
        const sql = `
            delete from project where project_key = '${param}'
        `
        const response = await db.query(sql);
        console.log(response);
        res.status(200).json({message : 'success'});
    }
    catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }
        

        
});


module.exports = router;