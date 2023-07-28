// here is where to handle all filtering that is related to courses
//
// const Course = require('./../models/courseModel');
class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
    const queryObj = { ...this.queryStr}
    const commonParams = ['page','sort','limit','fields'];
    commonParams.forEach((item)=>{
        return delete queryObj[item];
            });
    let querySt = JSON.stringify(queryObj);
       querySt =  JSON
        .parse(querySt
        .replace(/\b{gte|gt|lte|lt}\b/g
        ,match=>`$${match}`));
  return  new ApiFeatures(this.query.find(querySt),this.queryStr)
    }


sort(){
    const result = this.queryStr.sort 
    ?  this.query.sort(this.queryStr.sort
    .split(',')
    .join(' ')) 
    : this.query
    .sort('-createdAt');

    return new ApiFeatures(result,this.queryStr);
}

limitFields(){
 if(this.queryStr.fields){
const fields = this.queryStr
     .split(',')
     .join(' ');
     

     return new ApiFeatures(this.query.select(fields),
     this.queryStr);
 }
 else{
    return new ApiFeatures(this.query,this.queryStr)
 }
}


paginate(){
    const docNum = async () => await this.query.countDocuments();
    const pageNumber = parseInt(this.queryStr.page) || 1;
    const limitNumber = parseInt(this.queryStr.limit) || 2;
    const skipNumber = (pageNumber - 1) * limitNumber;
    if(this.queryStr.page){
        const pageLimit = Math.ceil(parseInt(docNum) / limitNumber);

      const paginated = this.queryStr.page <= pageLimit ? this.query
        .skip(skipNumber)
        .limit(limitNumber) 
        : this.query
        .skip(0)
        .limit(limitNumber);

        return new ApiFeatures(paginated,this.queryStr)
    }
    else{
       const paginated  = this.query.skip(skipNumber).limit(limitNumber);
        return new ApiFeatures(paginated,this.queryStr)
    }
    

}
}




module.exports = ApiFeatures;


// exports.queryFixer =(query)=>{
// // removing common parmas that are not exists in the database
//     const commonParams = ['page','sort','limit','fields'];
//     commonParams.forEach((item)=>{
//         return delete query[item];
//             });
//         // removing and replacing greater than less than
//         // and others with $gte to 
//         // fit in the normal monogodb db query.
//     let queryStr = JSON.stringify(query);
//        queryStr =  JSON
//         .parse(queryStr
//         .replace(/\b{gte|gt|lte|lt}\b/g
//         ,match=>`$${match}`));
// return queryStr;
// }

// exports.fieldLimiter=(query,modelObj)=>{
//         // selecting specific items from the list
//         //  is called projecting
//         // only selecting a certain item from a row is
//      //  needed in order to processing clients bandwith
//      if(query){
//   const fields = query
//          .split(',')
//          .join(' ');
//          return modelObj.select(fields);
//      }
//      else{
//         return modelObj;
//      }

// }


// //? This paginator will take user to the first page if page that does not exist is asked

// exports.paginator = (page,limit,modelObj,docNum)=>{
//     const pageNumber = parseInt(page) || 1;
//     const limitNumber = parseInt(limit) || 2;
//     const skipNumber = (pageNumber - 1) * limitNumber;
//     if(page){
//         const pageLimit = Math.ceil(parseInt(docNum) / limitNumber);
//         return  page <= pageLimit ? modelObj
//         .skip(skipNumber)
//         .limit(limitNumber) 
//         : modelObj
//         .skip(0)
//         .limit(limitNumber);

//     }
//     else{

//         return modelObj.skip(skipNumber).limit(limitNumber);
//     }
    

// }

// //? sorting functionality
// //? I bet this is the craziest 
// //? shortest  function you have everseen.


// exports.sorter = (sortParams
//     ,modelObj) => sortParams 
//         ?  modelObj.sort(sortParams
//          .split(',')
//         .join(' ')) 
//         : modelObj
//         .sort('-createdAt');
   












 // courses = await Course.find({
    //     'category':category,
    //     ratingAvarage:rating,
    //     title:Title
    // });
    // courses = await Course.find()
    // .where('category')
    // .equals(category)
    // .where('ratingAvarage')
    // .equals(rating)
    // .where('title')
    // .equals(Title)
    //
    // FILTERING 
    // ADVANCED FILTERING
