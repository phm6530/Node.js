const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const util = require('util');
const { NotFoundError } = require('../util/error'); //에러 인스턴스 

const db = require('../util/config'); //DB 연결
db.query = util.promisify(db.query); //DB 프로미스 생성

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
        const sql = `select * from project as a inner join 
        project_description as b on a.project_key = b.project_key where a.project_key =?
        `;
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
        res.status(200).json({message : 'success'});
    }
    catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }   
});



const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        const key = req.params.key;

        const uploadPath = path.join(__dirname, `uploads/${key}/`); // 안전한 경로 구성
        if (!fs.existsSync(uploadPath)) { // 폴더가 존재하지 않는 경우
            fs.mkdirSync(uploadPath, { recursive: true }); // 폴더 생성
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const key = req.params.key;
        
        const date = new Date();
        const dateString = date.toISOString().replace(/:/g, '').replace(/-/g, '').replace('T', '').replace(/\..+/, '');
        
        // 파일의 원본 이름에서 확장자 추출
        const ext = path.extname(file.originalname);
        // 새 파일명 구성 (원하는 형식으로 파일명 변경 가능)
        const newFilename = `${key}_${dateString}${ext}`; // 예시: 'newFileName_20230315123000.jpg'
        file.url = `${key}/${newFilename}`;
        cb(null, newFilename);
    }
});

const upload = multer({storage: storage});

router.post('/imgUploader/:key' , upload.single('img'), async(req, res , next )=>{
    const {url} = req.file;
    console.log('test :::: ',url);
    try{
        const imgUrl = `project/uploads/${url}`;
        return res.json({message : 'success' , fileUrl : imgUrl });
    }catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }
});



router.post('/addproject' , async(req, res , next)=>{
  
    try{
        const { key , ProjectDescription } = req.body;
        console.log('reqData::::::::::::::: ' , ProjectDescription);
        console.log(key);
        const sql = `
            select * from project as a inner join project_description as b on a.project_key = b.project_key where a.project_key = ?;
        `
        const result = await db.query(sql , [key]);
        console.log(result);
        if(result.length === 0){
            console.log('인서트');
            const sql = `
                insert into project_description(project_key , description) value(?,?);
            `
            const result = await db.query(sql , [key , ProjectDescription]);
            console.log(result);
        }else{
            console.log('업데이트');
            const sql = `
                update project_description set description = ? where project_key = ?;
            `
            const result = await db.query(sql , [ProjectDescription , key]);
            console.log(result);
        }


        // // SELECT * FROM project AS a INNER JOIN project_description AS b ON a.project_key = b.project_key;
        return res.status(200).json({message : 1});
    }catch(error){
        const err = new NotFoundError(error.message);
        next(err);
    }
})

module.exports = router;