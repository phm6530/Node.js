const express = require('express');
const router = express.Router();

const path = require('path');
const rootPath = require('../util/path');

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req , res , next)=>{
    res.render('add-product' , {pageTitle : 'admin - Products'});
});

// /admin/add-product => POST
router.post('/add-product',(req,res)=>{
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
