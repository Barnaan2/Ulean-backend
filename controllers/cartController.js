const Cart = require('./../models/cartModel')

exports.getCarts = async (req,res)=>{
    // here to ask for cart there should be a specific user who is  asking for it.
    try{

        const cartItems = await Cart.find();
       res.status(200).json({
        status:"STATUS  OK",
        data: {
           cartItems
        }
       });
    }
    catch(err){
     console.log(`There was an error while getting all courses`);
     console.error(err);
    }
}

exports.getCart = async (req,res)=>{

    try{
        const {id} = req.params;
        const data = await Cart.find(id);
        res.status(200).json({
            status:"STATUS  OK",
            data: {
               data
            }
 });
 }

    catch(err){
console.error(`There was an error while getting your cart ${err}`)
res.status(404).json({
    status:"There is an error while getting your cart",
    message:err
  });
 }
}

exports.createCart = async (req,res) =>{

    try{
        const data = req.body;
        const newCart = await Cart.create(data);
        res.status(201).json({
            status: "STATUS CREATED",
            data: {
               newCart
            }
        })
    }

    catch(err){
        console.error(`There was an error while getting your cart ${err}`)
        res.status(404).json({
            status:"There is an error while getting your cart",
            message:err
          });
         }
}

exports.updateCart = async (req,res) =>{

    try{
        const { id } = req.params;
        const data = req.body;
        const updatedCart = await Cart.findOneAndUpdate(id,data,{
            new:true,
            runValidators:true
        })
        res.status(201).json({
            status : "THE CONTENT IS UPDATED",
            data : {
               updatedCart
            }
        });
    }

    catch(err){
        console.error(`There was an error while getting your cart ${err}`)
        res.status(404).json({
            status:"There is an error while getting your cart",
            message:err
          });
         }
}


exports.deleteCart = async (req,res) =>{

    try{
     const {id } = req.params;
     await Cart.findByIdAndDelete(id);
        res.status(204).json({
            status : "THE CONTENT IS BEING DELETED SO  IT CANNOT BE FOUND.",
            data: {
                "message" : "The content is being deleted"
            }
        })
    }

    catch(err){
        console.error(`There was an error while getting your cart ${err}`)
        res.status(404).json({
            status:"There is an error while getting your cart",
            message:err
          });
         }
}