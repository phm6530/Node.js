const express = require('express');
const router = express.Router();//라우터 연결
const { verify }  = require('../util/auth'); 
const { BoardData , BoardWirte , boardTotal } = require('../util/readData');

// 전체 게시판
router.get('/', async (req, res, next) => {
    try {
        // 초기값 fs가 비동기이기에 await 선언해 줘야 동기 처리됨

        //Total 값 리터
        const boardCount = await boardTotal();
        
        //리턴할 데이터 가져오기
        const board = await BoardData();
        
        res.status(201).json({
            path : 'Board',
            counter : boardCount,
            boardData : board
        });

    } catch (error) {
        const err = new Error('Board 오류');
        next(err);
    }
});

router.post('/reply' ,  async(req, res, next) =>{
    const requestData = req.body;
    const prevData = await BoardData(); //이전 Data
    console.log(prevData);
    console.log(requestData);

    await BoardWirte([...prevData , requestData]);

    try{
        res.status(201).json({
            path : 'board/reply',
        })
    }
    catch(error){
        throw new Error('댓글 에러');
    }
});


//게시판 Detail verify
router.post('/:item', async (req, res, next) => {
    const page = req.params.item;
    const { limit } = req.body;

    const boardPage = await BoardData(page, limit);
    
    try {
        res.status(201).json({
            path : 'paging',
            pageData : boardPage
        });
    } catch (error) {
        throw new Error('게시판 불러오기 오류');
    }
});


module.exports = router;