const express = require('express');
const router = express.Router();//라우터 연결
// const { verify }  = require('../util/auth'); 
const { BoardData , BoardWirte , boardTotal , allBoardData } = require('../util/readData');
const { passwordHashing } = require('../util/password');
const { validation_Reply } = require('../util/validate');




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

router.post('/reply' ,  validation_Reply,  async(req, res, next) =>{
    const { userName , contents , password , idx , page } = req.body;
    
    try{
        const allData = await allBoardData(); //전체 데이터
            

        const hashedPassword = await passwordHashing(password);//비밀번호 해싱하기

        //쓰기
        await BoardWirte([{
            idx,
            userName,
            contents,
            hashedPassword
        } , ...allData]);

        //Total 값 리터
        const boardCount = await boardTotal();
        const resData = await BoardData(page);

   
        res.status(201).json({
            path : 'board/reply',
            counter : boardCount,
            resData : resData
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
    //Total 값 리터
    const boardCount = await boardTotal();

    try {
        res.status(201).json({
            path : 'paging',
            counter : boardCount,
            pageData : boardPage
        });
    } catch (error) {
        throw new Error('게시판 불러오기 오류');
    }
});


module.exports = router;