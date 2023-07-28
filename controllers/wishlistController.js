const Wishlist = require('./../models/wishlistModel');


exports.getWishlists = async (req,res)=>{
    try{
  // this is not logically right but for a while its kind of good to have good understanding of the database,
  const data = await  Wishlist.find();
        res.status(200).json({
         status:"STATUS  OK",
         data: {
           data
         }
        });
    }

    catch(err){
        console.error(`There was an error while processing your request ${err}`)
        res.status(404).json({
            status:"The server encountered an error while processing your request",
            message:err
          });
         }
 }





 exports.getWishlist = async (req,res)=>{
    
    try{
        const { id } = req.params;
        const data = await Wishlist.find(id);
        res.status(200).json({
         status:"STATUS  OK",
         data: {
             data
         }
        });
    }






    catch(err){
        console.error(`There was an error while processing your request ${err}`)
        res.status(404).json({
            status:"The server encountered an error while processing your request",
            message:err
          });
         }
 }
 



 
 exports.createWishlist = async (req,res) =>{
    try{
const data = req.body;
const newWishlist = await Wishlist.create(data);
        res.status(201).json({
            status: "STATUS CREATED",
            data: {
               newWishlist
            }
        })
    }
    catch(err){
        console.error(`There was an error while processing your request ${err}`)
        res.status(404).json({
            status:"The server encountered an error while processing your request",
            message:err
          });
         }
 }
 





 exports.updateWishlist = async (req,res) =>{
    try{
        const { id } = req.params;
        const data = req.body;
        const updatedWishlist =  await Wishlist.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true
        });
        res.status(201).json({
            status : "THE CONTENT IS UPDATED",
            data : {
              updatedWishlist
            }
        });
    }

    catch(err){
        console.error(`There was an error while processing your request ${err}`)
        res.status(404).json({
            status:"The server encountered an error while processing your request",
            message:err
          });
         }
 }
 
 




 exports.deleteWishlist = async (req,res) =>{
    try{
        // here getting the id is hard
 const { id } = req.params;
 await Wishlist.findByIdAndDelete(id);
        res.status(204).json({
            status : "THE CONTENT IS BEING DELETED SO  IT CANNOT BE FOUND.",
            data: {
                "message" : "The content you wanted is being deleted"
            }
        })
    }

    catch(err){
        console.error(`There was an error while processing your request ${err}`)
        res.status(404).json({
            status:"The server encountered an error while processing your request",
            message:err
          });
         }

 }