 
const mongoose = require('mongoose');

const mongoDB = process.env.MONGO_URL;

var db = mongoose.connection;
mongoose.connect(mongoDB).then(()=>{
    console.log("MongoDb connected");
}).catch((err)=>{
    console.log("MongoDb connection error",err);
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));