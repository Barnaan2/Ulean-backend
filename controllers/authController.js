const User = require('./../models/userModel');
const jwt = require('jsonwebtoken')
const { sendEmail } = require('./../config/email')
const crypto = require('crypto')



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
  




  exports.forgotPassword= async(req,res)=>{
    try{
        const user = await User.findOne({email : req.body.email });
        if(!user){
            res.status(404).json({
                status:"404",
                message:"User with this email address is not found."
            })
        }
        const resetToken = user.createPasswordResetToken();
        await user.save({validateBeforeSave:false});
        const resetUrl = `${req.protocol}://${req
        .get('host')}/api/v1/users/reset-password/${resetToken}`

        const message = `click this link to reset your password ${resetUrl}
         if your are don't asked for reseting
          your password please ignore this email`;

        try{
            await sendEmail({ 
                email:"bernabastekkalign@gmail.com",
                subject:"Reseting Password in Ulearn",
                message:message
            });
        }
        catch(err){
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({validateBeforeSave:false});
            res.status(500).json({
                status:"cannot send an email please try again",
                message:err
            })
        }
res.status(200).json({
    status:"success",
    message:"A reset link is sent to your email"
})

    }

catch(err){
    console.log("error");
 }
}



  exports.resetPassword = async(req,res)=>{
    try{
const hashedToken = crypto
.createHash('sha256')
.update(req.params.token)
.digest('hex');
const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() }
  });
  

if(!user){
    res.status(400).json({
        status:"400",
        message:"token is expired"
    })
}
user.password = req.body.password;
user.passwordConfirm = req.body.passwordConfirm;
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;

await user.save();
const token = signToken(user._id)
res.status(200).json({
    status : "Success",
    data:{
token
    }
    
});
    }
    catch(err){
        res.status(404).json({
            status:"404",
            message:"User with this email address is not found."
        })
    }
  }

  exports.updatePassword = async(req,res)=>{
    try{
const { password , newPassword ,passwordConfirm } = req.body;
const user = await User.findById(req.user.id).select('+password');
const correct = req.user.correctPassword(password,user.password);
if(correct){

user.password = newPassword;
user.passwordConfirm = passwordConfirm
await user.save();
token = signToken(user._id);
res.status(200).json({
    status:"you have successfully changed your password ",
    data:{
        token
    }
})
}

res.status(400).json({
    status:"Your password is not correct",
    message:"please provide the correct password"
});

    }
    catch(err){
   console.error(err);
   }

  }
