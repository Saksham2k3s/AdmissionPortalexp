const express = require('express');
const FrontController = require('../controllers/FrontController');
const CourseController = require('../controllers/CourseController');
const CheckUserAuth = require('../middleware/auth');
const AddminController = require('../controllers/Admin/AdminController');
const route = express.Router()

//router path
//Frontend controller
route.get('/', FrontController.login)

route.get('/home2',FrontController.home2)
route.get('/reg', FrontController.reg)
route.get('/course',FrontController.course)
route.get('/dash',CheckUserAuth,FrontController.dashboard)
route.get('/home',CheckUserAuth,FrontController.home)
route.get('/profile',CheckUserAuth, FrontController.profile)
route.post('/changepassword',CheckUserAuth,FrontController.changepassword)
route.post('/updateprofile',CheckUserAuth,FrontController.updateprofile)

//login page

route.post('/verifylogin',FrontController.verifylogin)
//for database

route.post('/userinsert', FrontController.userinsert)
//logout
route.get('/logout',FrontController.logout)
route.post('/courseInsert',CheckUserAuth,CourseController.courseInsert)
route.get('/coursedisplay',CheckUserAuth, CourseController.coursedisplay)

route.get('/views/:id',CheckUserAuth,CourseController.view)
route.get('/update/:id',CheckUserAuth, CourseController.update)
route.get('/delete/:id',CheckUserAuth, CourseController.delete)

//AdminController
route.get('/admin/display',CheckUserAuth,AddminController.display)
route.get('/admin/course/view/:id',CheckUserAuth,AddminController.courseview)

route.get('/admin/course/delete/:id',CheckUserAuth,AddminController.coursedelete)

route.get('/deleteuser/:id',CheckUserAuth, AddminController.delete)
route.get('/deleteuser/:id',CheckUserAuth, AddminController.delete)
route.get('/admin/deletedAcc',CheckUserAuth,AddminController.deletedAcc)


module.exports= route