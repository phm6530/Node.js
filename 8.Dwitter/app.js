const express = require('express');

const app = express();



app.use(express.json()); 

app.use(express.static('public'));

const tweetsRoute = require('./router/tweet');



app.use('/tweets' , tweetsRoute);

app.use((req,res,next)=>{
    res.sendStatus(404);
});

app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
});



app.listen(8080);