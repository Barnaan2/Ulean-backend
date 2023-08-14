const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
// the rule is fat model and thin controller.
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name is required to create a user'],
    
  },
  //
  password:{
    type:String,
    required:[true,'Password is required'],
    // default : 1234567
    minlength:6,
    select:false,

  },
  passwordConfirm:{
    type:String,
    required:[true,"Please confirm your password"],
    validate:{
      //This ONLY WORK IN SAVE,(on .create only)
      validator:function(el){
        return el === this.password;
      } 
    ,
    message: 'Passwords are not the same!'
    }
  },
  username:{
    type:String,
    required:[true,'Username is required to create a user'],
    unique:true

  },
  email:{
    type:String,
    required:[true,'Please provide your email'],
    unique:true,
    lowercase:true,
    validate:[validator.isEmail,"Please provide the correct email address"]
      

  },
  phoneNumber:{
    type:String,
    unique:true
  },
  bio:{
    type:String,
  },
  role:{
    type:String,
    enum:['student','instructor','admin'],
    default:'student'
  },
  profileImage:{
    type:String,
    
  }
  ,
  createdAt:{
    type:Date,
 default:Date.now()
  }  
,
updatedAt:{
    type:Date,
    default:Date.now(),
    select:false,
},

passwordChangedAt: Date,
passwordResetToken:String,
passwordResetExpires:Date,
active:{
  type:Boolean,
  default:true,
  select:false
}

});


// THIS IS THE SOFTDELETE IN DJANGO AND LARAVEL
userSchema.pre(/^find/,function(next){
this.find({active: {$ne : false}});
next()
});


// this middleware function should  be placed above the method that calls mongoose.model()
userSchema.pre('save', async function(next){
    // this runs if only password is modified.
  if(!this.isModified('password')){
    return next(); 
  } 
  this.password = await bcrypt.hash(this.password,12);
  this.passwordConfirm = undefined;
  next();
  });

  // THis is the method to compare password and it returns true or false
  userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
  }

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    console.log(JWTTimestamp);
  }
}

userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');

this.passwordResetToken =  crypto.createHash('sha256').update(resetToken).digest('hex');
this.PasswordResetExpires = Date.now() + 10 * 60 * 1000;
return resetToken;

}
const User = mongoose.model('User',userSchema);

// const testUser = new User({
//  name:'Barnaan  Tekalign' ,
//  password:1234,
//  username:'barnaan'
// });

// testUser.save().then(doc =>{
//   console.log(doc)
// }).catch(err=>{
//   console.log(err)
// });
module.exports = User;
