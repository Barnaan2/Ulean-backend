const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const express = require('express');
const User = require('./../models/userModel')

exports.protect = async(req,res,next)=>{
 let token;
 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
       return res.status(401).json({
        status:"unauthorized user",
        message:"You cannot access this protected route",
       });

        
    }

    const { id,iat } = await promisify(jwt.verify)(token,process.env
        .JWT_SECRET);
        const user = await User.findById(id); 
        // since i found the user type here
        // i can use it to identify user.   
        if(!user){
            return res.status(401).json({
                status:"unauthorized user",
                message:"You cannot access this protected route",
               });
        }
        //   user.changedPasswordAfter(iat);
req.user = user;
    next();
}


// this is authorization of user to specific task
exports.restrictTo = (...roles) =>{
    return(req,res,next)=>{
        console.log(req.user.role,roles);
        
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status: "403 you do not have permission to access this route",
                message:"Its forbidden"
            })
        }
        next();
    }
}