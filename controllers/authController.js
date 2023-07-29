const User = require('./../models/userModel');
const jwt = require('jsonwebtoken')

const signToken = (id)=>{
  return  jwt.sign({id:id},
        process.env
        .JWT_SECRET,
        {expiresIn:process.env
            .JWT_EXPIRES_IN
    });
}
// creating new user called signUp
exports.signUp = async (req,res)=>{
    try{
          const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            passwordConfirm :req.body.passwordConfirm,
            username :req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            bio: req.body.bio

        });
        const token =signToken(newUser._id)
          res.status(201).json({
              status : "Success",
              token,
              data: {
               user: newUser
              }
          })
      }
   
      catch (err){
          res.status(400).json({
              status:'fail',
              message:err
          })
      }
  
  }


  exports.login= async(req,res,next)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                status:'fail',
                message:err
            });
        }

        
        const user = await User
        .findOne({email:email})
        .select('+password');
        if(user) {
            const correct = await user
            .correctPassword(password,
                user.password);
            if(correct){
                const token = signToken(user._id)
                res.status(200).json({
                    status : "Success",
                    data:{
                        token
                    }
                    
                });
            }


            else{
                res.status(400).json({
                    status : "sorry your password is not correct",
                    data:{
                        "password":" the password is not correct"
                    }    
                })
            }
        }


        else{
            res.status(400).json({
                status : "sorry user with this email does not found ",
                data:{
                    token
                }
                
            })
        }
       
    }
    catch (err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
  }
  