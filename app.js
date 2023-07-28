const express = require('express');
const userRouter = require('./routes/userRoute');

const courseRouter = require('./routes/courseRoute')
const cartRouter = require('./routes/cartRoute')
const wishlistRouter = require('./routes/wishlistRoute')

 
const userMiddleware = require('./middlewares/userMiddleware')
const morgan = require('morgan')
// remember everything is middleware in express so you gotta use the use method .

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/images`));
// here is to make morgan work only in the development or
// to disable it in the production mode .
// BSON document is a json like document aht is tores data in mongoDB database
// BSON is just a typed json. and 
// the table is collection and row is document
// to very known facts of BSON  document the size of a bison document 16 MB
// each document has unique id that is like its unique for deferantion.

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// endpoints 
app.use('/api/v1/users',userRouter);
app.use('/api/v1/courses',courseRouter);
app.use('/api/v1/carts',cartRouter);
app.use('/api/v1/wishlists',wishlistRouter);
// app.use('/',ind  exRouter);
// userRouter.use(userMiddleware);
module.exports = app;