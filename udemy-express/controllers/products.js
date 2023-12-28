const products = [];

exports.getAddproduct = (req , res , next)=>{
    res.status(201).render('add-product' , {
        pageTitle : 'admin - Products',
        path : '/admin/add-product' 
    });
}

exports.postAddproduct =  (req,res)=>{
    products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getProducts = (req , res , next ) =>{
    res.render('shop' , {
        prods: products, 
        pageTitle : 'User Shop' , 
        path : '/' , 
        hasProducts: products.length > 0
    });

}