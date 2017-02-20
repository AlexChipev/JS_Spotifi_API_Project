let User = require('./user');
let fs = require('fs-extra');
let path = require('path');
var multer  = require('multer')
var upload = multer({ dest: path.join(__dirname, '../public/avatars/' )});
 const user = new User ();

module.exports.login = (req, res) => {
  const pass = req.body.login_pass;
  const email = req.body.login_email;

  User.find({email: email}, (err, object) => {
  if (err) {
   console.log(err);
  } else if(object.length !== 0 && object[0].password === pass) {
    module.exports.message = object[0].username;
     res.redirect('/home.html');
    } else {
           module.exports.message = 'Wrong email or password!';
           res.redirect('/');
   }
  });
};

module.exports.register = (req, res) => {

 user.username = req.body.userName;
 user.password = req.body.password;
 user.email = req.body.email;

 User.find({email: user.email}, (err, object) => {
   if (err) {
     console.log(err);
    } else if(object.length === 0) {
      user.save();
      module.exports.message = user.username;
       res.redirect('/home.html');
      } else {
        module.exports.message = 'Email already exists!';
        res.redirect('/');
      }
    });
}

// function copyImg(avatar) {
//
// //user.image_path = req.body.avatar;
//   //console.log(user.image_path);
//   //console.log('proba');
// fs.copy(avatar, 'public/avatars/'+avatar, (err) => {
//     if(err) {
//       module.exports.message = 'Cannot copy file!';
//     }
// });
// }
