const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");

module.exports={
    selectedDb : {},
    async connectMongoose(){
        try{
            await mongoose.connect(process.env.MONGO_URL);
            console.log("Mongoose connected")
        }catch(err){
            console.log(err);
        }
    }
}