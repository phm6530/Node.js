const express = require('express');
const router = express.Router();//라우터 연결
const { verify }  = require('../util/auth'); 
const { BoardData } = require('../util/readData');

//fs가 비동기이기에 await 선언해 줘야 동기 처리됨
const promiseBoardData = () =>{
    const data = BoardData();
    return data;
}


// 전체 게시판
router.get('/', async (req, res, next) => {
    try {
        res.status(201).json({
            path : 'BoardAll',
            boardData : await promiseBoardData()
        });
    } catch (error) {
        const err = new Error('error error error ');
        next(err);
    }
});


//게시판 Detail
router.get('/:item', verify , async (req, res, next) => {
    const param = req.params.item;

    try {
        res.status(201).json({
            path : 'BoardDetila',
            param : param
        });
    } catch (error) {
        const err = new Error('error error error ');
        next(err);
    }
});


module.exports = router;