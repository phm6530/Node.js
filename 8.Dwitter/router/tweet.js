const express = require('express');
const router = express.Router(); // express.Router()로 router를 생성
const bodyParser = require('body-parser');




let userData = [
    {
        name : 'hyunmin',
        age : 33 ,
        date : '2023-11-27',
        id : 1 ,
        contents : '안녕하세요?'
    },
    {
        name : 'asshole',
        age : 34 ,
        date : '2023-11-27',
        id : 2 ,
        contents : '밥먹었어요?'
    },
    {
        name : '용손쒸',
        age : 33 ,
        date : '2023-11-27',
        id : 3 ,
        contents : '먹었어요'
    }
];


router.get('/', (req, res) => {
    res.send(userData);
});


router.get('/:name', (req, res) => {
    const name = req.params.name;
    const result = userData.filter((e) => name == e.name);
    if (!result) {
        return res.status(400).json({ error: 'Name is required' });
        
    }
    else if(result.length === 0){
        res.status(200).json([]);
    }
    else {
        res.status(200).json(result);
    }
});

router.post('/add', (req, res) => {
    const body = req.body;
    const addData = {
        name: body.name,
        age: 33,
        date: '2023-11-27',
        id: 3,
        contents: body.contents,
    };
    const result = [...userData, addData];
    userData = result;
    if (!req.body) {
        return res.status(400).send('Bad Request: Request body is missing');
    }
    res.status(200).send(result);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    const findUserIndex = userData.findIndex((e) => e.id == id);
    if (findUserIndex === -1) {
        return res.status(404).send('UserData Not Found!!');
    }
    
    // 새로운 배열을 생성하여 해당 인덱스의 요소를 제외한 요소들을 복사
    const updatedUserData = userData.filter((_, index) => index !== findUserIndex);
    userData = updatedUserData;
    res.status(200).send(updatedUserData);

});
module.exports = router; // router를 모듈로 export