const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

// mongoose user schema
const userSchema = new Schema(
    {
        firstName : {
            type : String,
            minLength : 2,
            maxLength : 25,
            required : true
        },
        lastName : {
            type : String,
            minLength : 2,
            maxLength : 25,
            required : true
        },
        middleName : {
            type : String,
            minLength : 2,
            maxLength : 25,
            required : false
        },
        dateOfBirth : {
            type : String,
            required : false
        },
        email:{
            type : String,
            required : true,
            validate : validateMail,
        },
        phone : {
            type : Number,
            required : true
        },
        occupation : {
            type : String,
            required : false
        },
        company : {
            type : String,
            required : false
        },
        password : {
            type : String,
            required : false,
        }
    }
)

const userData = mongoose.model("users",userSchema);
module.exports = userData;

async function validateMail(email){
    if(!validator.isEmail(email)) throw new Error ("Please enter a valid email address")
}