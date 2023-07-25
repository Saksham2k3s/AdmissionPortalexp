 const express = require('express');
const app = express()
const port = 2000
const web = require('./routes/web')
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
//fileuplaod
app.use(fileUpload({useTempFiles: true}));
//messages
app.use(session({
  secret:'secret',
  cookie:{maxAge: 60000},
  resave:false,
  saveUninitialized:false,
}))

//cookie
app.use(cookieParser())
//flash message
app.use(flash());

//to encode into json form
app.use(express.urlencoded({extended: true}))

//database connecting
const connectdb = require('./db/connectdb');



//connectdb
connectdb()

//static files to link public folder files
app.use(express.static('public'))

//ejs set html

app.set('view engine', 'ejs')

//router loader
app.use('/',web)



 //server start
app.listen(port, () => {
  console.log(`server start on localhost: ${port}`)
  //template string format to write string
})
// console.log(express)
