const express = require('express');
const { checkId,checkBody } = require('./../middlewares/userMiddleware')
const {getUser,getUsers,createUser,updateUser,deleteUser} = require('./../controllers/userControllers');
const router = express.Router();


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
//     }
// })

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;