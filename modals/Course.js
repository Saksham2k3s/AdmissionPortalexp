const mongoose = require('mongoose')


//define schema
const Coursechema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneno:{
        type: String,
        required: true
    },
    tenth:{
        type: String,
        required: true
    },
    tweleth:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'Pending'
    }
},{timestamps: true})

//create collections
const CourseModal = mongoose.model('course',Coursechema)
module.exports= CourseModal