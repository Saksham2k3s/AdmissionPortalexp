const jwt = require('jsonwebtoken');
const userModal = require('../modals/Users')
const CourseModal= require ('../modals/Course')


const CheckUserAuth = async(req,res,next)=>{
    // console.log('hello user')
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error','unauthorised user please login')
    return res.redirect('/')
    }
    else{
        const verify_token = jwt.verify(token,'sakshishrivastava123')
        // console.log(verify_token)
        const data = await userModal.findOne({_id:verify_token.id})
       
        // console.log(data);
        req.user = data;
       
        next();
    }
}
module.exports = CheckUserAuth