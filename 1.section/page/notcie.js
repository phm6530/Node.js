const express = require('express');
const router = express.Router();//라우터 연결
const { verify }  = require('../util/auth'); 

// 전체 게시판
router.get('/', async (req, res, next) => {
    try {
        res.status(201).json({
            path : 'noticeAll',
            param : 'ALL'
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
            path : 'noticeDetila',
            param : param
        });
    } catch (error) {
        const err = new Error('error error error ');
        next(err);
    }
});


module.exports = router;