const mongoose = require('mongoose')
const url= 'mongodb://0.0.0.0:27017/admissionportal' 
const live_url = 'mongodb+srv://sakshamshrivastav58:saksham2003@cluster0.suu6yvj.mongodb.net/admissionportal?retryWrites=true&w=majority'
const connectdb = ()=>{
    return mongoose.connect(live_url)
    .then(()=>{
      console.log("connected successfully")  
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports= connectdb