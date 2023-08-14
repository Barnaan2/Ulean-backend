const User = require('./../models/userModel')

const filter = (obj, ...allowedFields)=>{
    let FilteredObj = {};
const allowedFields = allowedFields;
 const selectedFields = Object.keys(obj);
selectedFields.forEach(item=>{
if(allowedFields.includes(item)){
    FilteredObj[item] = obj[item];
}
})
// with this method we will able to tackle the attack 
// of upgrading users role.
return FilteredObj;
}

exports.updateMyData = async(req,res) =>{
    const { password , passwordConfirm } = req.body;

    if(password || passwordConfirm ){

        res.status(400).json({
            status : "This endpoint is not for updating password !"

        })
    }
   try{
const filteredBody = filter(req.body,'name','email');
       const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody,{new:true,runValidators:true});
      res.status(200).json({
          status:"the data is updated",
          data:{
              updatedUser
          }
      })
      }
   catch(err){
    console.log(err);
   }
    // here i believe i can use findone and update method.
}

exports.deleteMyData = async (req,res) =>{
    try{
// create object to update user's activeness
const deactivate = {'active':false};
User.findByIdAndUpdate(req.id,deactivate);
res.status(204).json({
    status:"the content you are looking for is deleted !"
})

    }
    catch(err){
        console.log(err)
    }

}












exports.getUsers  = async (req,res)=>{
    try{
        const users =  await User.find();
         res.status(200).json({
          status : "users found successfully",
          results: users.length,
          data : users
         });
    }

    catch(err){
        res.status(404).json({
            status:'NOT FOUND',
            message:'NO CONETENT IS FOUND'
        });
    }
}

exports.createUser = async (req,res)=>{
  const newUser = await User.create(req.body);
    try{
        res.status(201).json({
            status : "Success",
            data: {
                data: newUser
            }
        })
    }

    catch (err){
        res.status(400).json({
            status:'fail',
            message:"Bad Request"
        })
    }

}


exports.updateUser = async (req,res)=>{
    const { id } = req.params;
    const data = req.body;
}
    try{
        const user = await User.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true,
        });

        res.status(200).json({
            status:'The content is updated correctly',
            data: user
        });

    }
    catch(err){
        res.status(404).json({
            status:"The data is not found",
            message:err
        })

    }




exports.getUser = async (req,res)=>{
// console.log(req.body);
// console.log(req.params);
const { id } = req.params;
try{
const user = await User.findById(id);
res.status(200).json({
    status:"A user is found",
    data:user
});
}
catch(err){ 
    res.status(404).json({
        status:"fail",
        message:err
    });
}
}


exports.deleteUser = async (req,res)=>{
    const { id } = req.params
    try{

        //awaiting is not optional its must.
       await User.findByIdAndDelete(id)
        res.status(204)
        .json({
            status :"user is deleted",
            data: {
                message: " user is deleted detail"
            }
        })
    }
    catch(err){
        res.status(404).json({
            status:'User not found',
            message: err
        })
    }
}


// exports.updateAccount =(res,req)=>{
// try{


// }
// catch(err){
//     console.log(err);
// }
// }