const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name is required to create a user'],
    // unique:true
  },
  password:{
    type:String,
    required:[true,'Password is required'],
    // default : 1234567
    select:false

  },
  username:{
    type:String,
    required:[true,'Username is required to create a user'],
    unique:true

  },
  email:{
    type:String,
    unique:true
  },
  phoneNumber:{
    type:String,
    unique:true
  },
  bio:{
    type:String,
  },
  userType:{
    type:String,
    default:'Student'
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

});

const User = mongoose.model('User',userSchema);

// const testUser = new User({
//  name:'Barnaa n Tekalign' ,
//  password:1234,
//  username:'barnaan'
// });

// testUser.save().then(doc =>{
//   console.log(doc)
// }).catch(err=>{
//   console.log(err)
// });
module.exports = User;
