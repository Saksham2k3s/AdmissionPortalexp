const CourseModal = require('../../modals/Course');
const UserModal = require('../../modals/Users');
class AddminController{
static display = async(req,res)=>{
    try {
        const{name, image,_id} = req.user;
        const data = await CourseModal.find()
        const id = data.userid;
        
      res.render("admin/display",{d: data, n:name, i:image,id:id});  
    } catch (error) {
        console.log(error)
    }
}
static courseview = async(req,res)=>{
    try {
        const{name, image,_id} = req.user;
        const data = await CourseModal.findById(req.params.id)
        
        const id = data.userid;
         
        const user = await UserModal.findById(id)
        if(user){
            res.render("admin/view",{d: data, n:name, i:image, u:user});  
        }else{
            res.redirect('/')
        }
     
    } catch (error) {
        console.log(error)
    }
}
static coursedelete = async(req,res)=>{
    try {
       
      const user = await CourseModal.findByIdAndDelete(req.params.id) 
      res.redirect('/admin/display')
    } catch (error) {
        console.log(error)
    }
}
static delete = async(req,res)=>{
    try{
 // console.log(req.params.id);
 const data = await UserModal.findByIdAndDelete(req.params.id)
 const user = await CourseModal.findByIdAndDelete()
 res.redirect('/admin/display')
    }catch(error){
       console.log(error)
    }
 }
 static deletedAcc = async(req,res)=>{
    try {
        res.render("deletedAcc")
    } catch (error) {
        console.log(error) 
    }
 }
}
module.exports = AddminController