module.exports = (req,res,next) => {
    if(!req.session.userid){
        res.redirect('/login');
    }
    next()
}