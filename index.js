const express = require("express");
const {MongoClient} = require("mongodb")
const mongo = require("./shared");
const dotenv = require("dotenv")
const userRouter = require('./Router/user')

const app = express();
app.use(express.json());
dotenv.config();
// console.log(process.env)
const PORT = process.env.PORT
// mongo.connect();
mongo.connectMongoose();

app.use("/",(req,res,next)=>{
    next()
});

app.use('/user',userRouter);

app.listen(PORT,()=>{
    console.log("Server started",PORT)
});