// const { timeStamp } = require('console')
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
     
    },
    profilePic:{
        type:String,
       default: "",
    },  
},
 {timeStamps: true }
);


module.exports = mongoose.model('User', UserSchema);