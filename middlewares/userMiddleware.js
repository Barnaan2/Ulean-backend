exports.userMiddleware = (req,res,next)=>{
// console.log(req.body);
// console.log("This middleware only works for user's end point.");
next();
}
exports.checkId = (req,res,val)=>{
    console.log(`id of the user is ${val}`)
}


exports.checkBody = (req,res,next)=>{
    const data = req.body;
    console.log("This is checkbody middleware ");
    if(data.name && data.price){
        next()
    }
    else{
    return res.status(400).json({
        status:"400 bad request",
        data : {
            "message":"all the needed data is not included",
        }
    })
    }
    }