
const { name } = require('ejs')
const CourseModal = require('../modals/Course') 
class CourseController{

static courseInsert = async(req,res)=>{
 try{
   const{name,image,_id}= req.user
   //  console.log(req.body)
   const data = CourseModal({
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      tenth: req.body.tenth,
      tweleth: req.body.tweleth,
      course: req.body.course,
      userid: _id
   })
   await data.save()
  
   res.redirect('/coursedisplay')
 } 
 catch(error){
    console.log(error)
 }  
}
static coursedisplay = async(req,res)=>{
   try{
      const{name,image,_id}= req.user
      const data = await CourseModal.find({userid:_id})
      // console.log(data)
   res.render('course/display',{d:data,n:name, i:image, id:_id})
   }catch(error){
      console.log(error)
   }
}
static view = async(req,res)=>{
   try{
// console.log(req.params.id);
const data = await CourseModal.findById(req.params.id)

        

res.render('course/view',{view:data})
   }catch(error){
      console.log(error)
   }
}
 static update = async(req,res)=>{
   try{
      const data = await CourseModal.findByIdAndUpdate(req.params.id,{
         name: req.body.name,
         email: req.body.email,
         phoneno: req.body.phoneno,
         tenth: req.body.tenth,
         tweleth: req.body.tweleth,
         course: req.body.course
      })
      //redirect me route ka path ata h
      res.redirect('/coursedisplay')
   }catch(error){
      console.log(error)
   }
 }
 static delete = async(req,res)=>{
   try{
// console.log(req.params.id);
const data = await CourseModal.findByIdAndDelete(req.params.id)

res.redirect('/coursedisplay')
   }catch(error){
      console.log(error)
   }
}
}
module.exports = CourseController