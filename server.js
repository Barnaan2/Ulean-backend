const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path : './config/config.env'});
const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>',
process.env.DATABASE_PASSWORD)
console.log(DB)
const data = mongoose
.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex : true,
  useFindAndModify : false,
  useUnifiedTopology: true
  
});


const PORT = process.env.PORT || 3000;
const server = app.listen(3000,()=>{
  console.log(`Server is listening at port ${PORT}`);
});

// here is the server part. or its about node js
// this env is set express
// console.log(app.get('env'));
// console.log(process.env);