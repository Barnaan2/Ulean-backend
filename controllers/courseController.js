const Course = require('./../models/courseModel');
// const { queryFixer,fieldLimiter,paginator,sorter } = require('./../utility/filtering');
const ApiFeatures = require('./../utility/filtering');

exports.getCourses = async (req,res)=>{
try{
   const features = new ApiFeatures(Course.find(), req.query)
   .filter()
   .sort()
   .limitFields()
   .paginate();
//    let courses = Course.find(queryObj);

// if(req.query){
//         courses = 
//         fieldLimiter(req
//             .query
//             .fields,
//             courses);


//          courses = paginator(req
//             .query
//             .page
//             ,req
//             .query
//             .limit,
//             courses,
//             numCourse);
//             courses =  sorter(req
//                 .query
//                 .sort,
//                 courses);


       
//     }
  const  courses = await features.query;
    res
    .status(200)
    .json({
     status:"STATUS  OK",
     length: courses.length,
     data: {
         courses
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

 exports.getCourse = async (req,res)=>{
    try{

        const {id} = req.params;
        const data = await Course.find(id);
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
 
 
 exports.createCourse = async (req,res) =>{
    try{
const data = req.body;
const newCourse = await Course.create(data);
        res.status(201).json({
            status: "STATUS CREATED",
            data: {
                newCourse
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
 
 exports.updateCourse = async (req,res) =>{


    try{
        const { id } = req.params;
        const data = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true,
        });

        res.status(201).json({
            status : "THE CONTENT IS UPDATED",
            data : {
                updatedCourse
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
 
 
 exports.deleteCourse = async (req,res) =>{
    try{
        const { id } = req.params;
        await Course.findOneAndDelete(id);
        res.status(204).json({
            status : "THE CONTENT IS BEING DELETED SO  IT CANNOT BE FOUND.",
            data: {
                message:"The content is being deleted."
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


 exports.getStats = async(req,res) =>{
    // is is used for advanced dashboard for users.
    // actually for both instractors and other admins
    try{
 const stats = await Course.aggregate([
            {
              $match: {
                ratingAvarage : { $gte: 4 }
              }
            },
            {
              $group: { 
                _id: null,
                totalCourse:{$sum:1},
               totalRating:{$sum:'$ratingQuantity'},
                avgRating: { $avg: '$ratingAvarage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
              }
            }
          ]);
          
res.status(200).json({
    status:'200 Ok',
    data : {
        stats
    }
})


    }

    catch(err){
        console.error(err);
        res.status(404).json({
            status:"The server encountered an error",
            message: err
        })
    }
 }

//  exports.getTRcourses = async(req,res)=>{
// try{
//  let topCourses = await sorter(req
//     .query
//     .sort,
//     Course.find());

//     res.status(200).
 

// }
// catch(err){
// res.status(400).json({
//     status:'The server encountered and error while processing your request',
//     message : err
// });

// }
//  }