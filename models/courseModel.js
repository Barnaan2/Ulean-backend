const mongoose = require('mongoose');
const slugify = require('slugify');



// some datatypes should be checked and fixed.
const courseSchema = new  mongoose.Schema({
title:{
type: String,
required : [true,'A course should have a name'],
},
slug:{
    type:String,
},
instructor:{
    // here the id of instructor user in needed
type:String,
required:[true,'A course should an instructor ']
},

content :{
    type:[String],
    required : [
        true,
        'A course should have a list of contents '
    ]
},
description : {
    type: String,
    required:[
        true,
        'Description of the course should be added'
    ],
    trim:true
    
},
summary:{
    type:String,
    required:[
        true,
        'Summary of the course should be added'
    ]
},
price: {
    type: Number,
    required:[
      true,'The price of a course should be added'  
    ]
},
priceDiscount:Number,

keywords:{
    type:[String],

},
category:{
    type:String,
    required:[true,'A course should have category']
},

length:{
    type:Number,
    required : [true,'The length of the course should be added in hours']
},
ratingAvarage:{
    type:Number,
    default:4.5
},
ratingQuantity:{
    type:Number,
    default:0
},
coverImage:{
    type:String,
    required:[true,'Cover Image is needed']
},
previewVideo:{
    type:String,
    required:[
        true,
        'Preview video is required'
    ]
},
courseFeature :{
    type:[String],
    required:[
        true,'Features like certification should be added'
    ]
},
enrolledStudent:{
type:[String],

},
courseFile:{
    type:String,
    required:[
        true,
        'Zipped file of the course is needed'
    ]
},

majorTopic:{
    type:[String],
    required:[true,'What the student learn at the end of the course should be added']
},
language:{
    type:[String],
    required:[
        true,
        'Language of the course should be added'
    ]
},
createdAt:{
    type: Date,
    default: Date.now()
},
updatedAt:{
    type:Date,
    default:Date.now()
},
secretCourse:{
    type:Boolean,
    default:false
}

}
,{
 toJSON: {virtuals :true }  ,
 toOb:{virtuals: true}
}
);


// these are data to be specified in the response but 
// not to be persisted in the database.
// these are actually like django model methods.
courseSchema.virtual('Developer').get(
    function(){
        return "QemerSoftware Plc";
    }
)


// document middleware  ITS JUST MEANS DJANGO'S SIGNALS
courseSchema.pre('save',function(next){
   this.slug = slugify(this.name,{lower:true});
   next();
})

// the post save document middleware(HOOKS) is this .
courseSchema.post('save',function(doc,next){
    
    console.log(doc);
    next();
});

// READ MONGOOSE DOCUMENTATIONS ABOUT ,DOCUMENT MIDDLEWARE,

// this is the queryMiddleware (HOOK)
courseSchema.pre(/^find/ ,function(next){
    this.start = Date.now()
this.find({secretCourse : {$ne:true}})
next();
});

courseSchema.post(/^find/,function(doc,next){
console.log(`the query took ${Date.now() - this.start} miliseconds`)
next();
})

const Course = mongoose.model('Course',courseSchema);
module.exports = Course;
