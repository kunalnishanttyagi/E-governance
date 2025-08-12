// here i will create user model
// user model is created for storing user information in the database
// it is user for 
const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        // required:true,
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    aadhar:{
        type:String,
        required:true
    },
    pan:{
        type:String,
        // required:true
    },
    ration:{
        type:String,
        // required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    otp:{
        type:String,
        // required:true
    },
    role:{
        type:String,
        default:"user"
    }


})

// Export the model
// mongoose.models.User || mongoose.model('User', userSchema);
module.exports = mongoose.models.User || mongoose.model('User', userSchema);