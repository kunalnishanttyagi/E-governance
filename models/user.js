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
    pancard:{
        type:String,
        // required:true
    },
    rationcard:{
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
    },
    address:{
        type:String,
        // required:true
        default:""
    },
    profilePicture:{
        type:String,
        // required:true
        default:""
        
    },
    // notification is a array of notifications where notification is a simple string
    notifications:[{
        type:String,
    }],

    // now it is time to make changes in our model as we have came so far that now we need to add more fields
    // till now feeling fine but do not know about tommorow lets go guys
    
    



})

// Export the model
// mongoose.models.User || mongoose.model('User', userSchema);
module.exports = mongoose.models.User || mongoose.model('User', userSchema);