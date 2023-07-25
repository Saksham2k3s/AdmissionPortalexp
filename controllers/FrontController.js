const UserModal = require("../modals/Users");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const CourseModal = require("../modals/Course");
cloudinary.config({
  cloud_name: "dvchhaewa",
  api_key: "627919386724149",
  api_secret: "MsZuXjG3MNsvGMD5QixwmlLmWr0",
  secure: false,
});
class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static reg = async (req, res) => {
    try {
      res.render("reg", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static dashboard = async (req, res) => {
    try {
      const { name, image, _id, email } = req.user;
      const ml = await CourseModal.findOne({ userid: _id, course: "machine learning" });
      const java = await CourseModal.findOne({ userid: _id, course: "java" });
      const DSA = await CourseModal.findOne({ userid: _id, course: "Data Structures" });
      const wd = await CourseModal.findOne({ userid: _id, course: "Web Development" });
      const gd = await CourseModal.findOne({ userid: _id, course: "Graphic Designing" });

      res.render("dashboard", {
        n: name,
        i: image,
        e: email,
        java:java,
       ml:ml,
       DSA: DSA,
       wd:wd,
       gd:gd
       
      
      });
    } catch (error) {
      console.log(error);
    }
  };
  static home = async (req, res) => {
    try {
      // const{_id} = req.body;

      const { name, image, _id } = req.user;
      // res.render("home",{i:image, n:name, id:_id})
      res.render("home", { i: image, n: name, id: _id });
    } catch (error) {
      console.log(error);
    }
  };
  static home2 = async (req, res) => {
    try {
      res.render("home2");
    } catch (error) {
      console.log(error);
    }
  };
  static course = async (req, res) => {
    try {
      res.render("course2");
    } catch (error) {
      console.log(error);
    }
  };

  static userinsert = async (req, res) => {
    // console.log(req.files.image)
    const imageFile = req.files.image;
    const imageUpload = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "profileImage",
      }
    );
    // console.log(imageUpload);
    const { name, email, password, confirm_password, dob, cityname, clgname,phoneno} = req.body;
    // console.log(req.body)
    const user = await UserModal.findOne({ email: email });
    // console.log(user);
    if (user) {
      req.flash("error", "email already exits");
      res.redirect("/reg");
    } else {
      if (name && password && email && confirm_password && dob && cityname && clgname && phoneno) {
        if (password == confirm_password) {
          try {
            //   console.log(req.body)
            const hashpassword = await bcrypt.hash(password, 10);
            const resul = UserModal({
              name: name,
              email: email,
              dob: dob,
              cityname: cityname,
              clgname : clgname,
              phoneno : phoneno,
              password: hashpassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            await resul.save();
            res.redirect("/");
          } catch (error) {
            console.log(error);
          }
        } else {
          req.flash("error", "password and confirm password does not match");
          res.redirect("/reg");
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/reg");
      }
    }
  };
  static verifylogin = async (req, res) => {
    try {
      //  console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModal.findOne({ email: email });
     
        if (user != null) {
          const ismatched = await bcrypt.compare(password, user.password); //for matching password bw database and user enter in login
          if (ismatched) {
            
            if(user.role == 'user'){
              //generate token
              const token = jwt.sign({ id: user._id }, "sakshishrivastava123");
              // console.log(token);
              res.cookie("token", token);
              res.redirect("/home");
            }
            if(user.role == 'Admin'){
                  //generate token
                  const token = jwt.sign({ id: user._id }, "sakshishrivastava123");
                  // console.log(token);
                  res.cookie("token", token);
                  res.redirect("/admin/display");
            }
          } else {
            req.flash("error", "Your email or password is not valid");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not a ragister user");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      const { name, image, email,_id } = req.user;
      const data = await UserModal.findById(_id);
     
      //  const course = await CourseModal.find()
      
      res.render("profile", { n: name, i: image, e: email, d:data, message: req.flash("error"), message2: req.flash("success")});
    //   { message: req.flash("error") }
    } catch (error) {
      console.log(error);
    }
  };
  static changepassword = async (req, res) => {
    try {
      const { name, image, email ,_id} = req.user;
      const { oldpassword, newpassword, confirmpassword } = req.body;
      if (oldpassword && newpassword && confirmpassword) {
        const user = await UserModal.findById(_id);
        const ismatch = await bcrypt.compare(oldpassword, user.password);
        if (!ismatch) {
          req.flash("error", "old password is not matched");
          res.redirect("/profile");
        } else {
          if (newpassword !== confirmpassword) {
            req.flash("error", "password and confirm password does not match");
            res.redirect("/profile");
          } else {
            const NewHashpassword = await bcrypt.hash(newpassword, 10);
            await UserModal.findByIdAndUpdate(_id, {
              $set: { password: NewHashpassword },
            });
            req.flash("success", "password changed successfully");
            res.redirect("/profile");
          }
        }
      } else {
        req.flash("error", "All fields are required");
        res.redirect("/profile");
      }
      console.log(req.body);
    } catch (error) {
      console.log(error);
    }
  };
  static updateprofile = async (req, res) => {
    try {
      const { name, image, email } = req.user;
      console.log(req.files.image);
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
