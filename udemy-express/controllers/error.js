exports.get404page =( req , res )=>{
    // res.send('404 Not Found');
    // res.sendStatus(404);\
    // res.status(404).sendFile(path.join( rootPath, 'views' , '404.html'));
    res.status(404).render('404' , {
        pageTitle : 'Page Not Found',
        path : ''
    });
}
