const mongoose = require('mongoose')


//define schema
const Userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
      type: String,
      required: true
  },
  clgname:{
    type: String,
      required: true,
  },
  cityname: {
    type: String,
    required: true
  },
  phoneno: {
    type: String,
    required: true
  },
    password:{
        type: String,
        required: true
    },
    image:{
      public_id:{
        type:String,
        required: true,
      },
      url:{
        type:String,
        required:true,
      },
    
    },
    role:{
      type: String,
      default: 'user'
    }
},{timestamps: true})

//create collections
const UserModal = mongoose.model('user',Userschema)
module.exports= UserModal