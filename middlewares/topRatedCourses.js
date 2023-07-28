
// This is called Alias link 
exports.topRatedCourses = (req,res,next)=>{
    req.query.limit = 5;
    req.query.sort = '-ratingAvarage,price';
    next();
}