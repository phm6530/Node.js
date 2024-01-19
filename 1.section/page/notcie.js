const express = require('express');
const router = express.Router();//라우터 연결
const { verify }  = require('../util/auth'); 
const { BoardData , BoardWirte } = require('../util/readData');

// 전체 게시판
router.get('/', async (req, res, next) => {
    try {
        res.status(201).json({
            path : 'Board',
            //fs가 비동기이기에 await 선언해 줘야 동기 처리됨
            boardData : await BoardData()
        });
    } catch (error) {
        const err = new Error('Board 오류');
        next(err);
    }
});

router.post('/reply' ,  async(req, res, next) =>{
    const data = req.body; 
    const prevObj = await BoardData();
    const lastObj = prevObj.push(data);
    
 
    
    // console.log(prevObj);
    
    console.log(prevObj);
    await BoardWirte(prevObj);
    if(prevObj[lastObj - 1] === data){
        try{
            res.status(201).json({
                path : 'board/reply',
                data : prevObj[lastObj - 1]
            })
        }
        catch(error){
            throw new Error('댓글 에러');
        }
    }else{
        throw new Error('댓글 에러');
    }

    

});


//게시판 Detail
router.get('/:item', verify , async (req, res, next) => {
    const param = req.params.item;

    try {
        res.status(201).json({
            path : 'Detail',
            param : param
        });
    } catch (error) {
        const err = new Error('error error error ');
        next(err);
    }
});


module.exports = router;