const express = require('express');

const router = express.Router();

const path = require('path');
const rootPath = require('../util/path');

const adminRouter= require('./admin');

router.get('/', (req , res , next ) =>{
    
    const products = adminRouter.products;
    console.log(products);
    res.render('shop' , {
        prods: products, 
        pageTitle : 'User Shop' , 
        path : '/' , 
        hasProducts: products.length > 0
    });

});

module.exports = router;