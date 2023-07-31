const express = require('express');
const { checkId,checkBody } = require('./../middlewares/userMiddleware')
const {getUser,getUsers,createUser,updateUser,deleteUser} = require('./../controllers/userControllers');
const {signUp,login, forgotPassword,resetPassword,updatePassword} = require('./../controllers/authController');
const router = express.Router();
const {protect,restrictTo} = require('./../middlewares/authMiddleware')


// router.param('id',checkId)
// router.param('id',(req,res,next,val)=>{
//     console.log(`the id is ${val}`);
//     const data = {
//         "name" : "barnaan",
//         "price" : 123
//     };

    

    
   
//     let id = parseInt(val);
//     if(id > 0 && id <100 ){
//         next();
//     }
//     else{
//       return  res.status(400).json({status : "The main page "})
//     }clear

// })
router
.patch('/change-password/',protect ,updatePassword)
router
.post('/login/',login);
router
.post('/sign-up/',signUp);
router
.post('/forgot-password/',forgotPassword)
router
.patch('/reset-password/:token',resetPassword)
// .patch('/reset-password/:token',resetPassword)



 
router.route('/')
.get(protect,restrictTo('admin','student'),getUsers)
.post(createUser);

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;