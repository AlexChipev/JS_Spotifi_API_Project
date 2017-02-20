let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mongoose = require('mongoose');
let fs = require('fs-extra');
let action = require('./public/modules/action');
let get = require('./public/modules/getters');
let session = require('express-session');
var multer  = require('multer')
var upload = multer({ dest: path.join(__dirname, '../public/avatars/' )});
mongoose.Promise = require('bluebird');

let User = require('./public/modules/user');
mongoose.connect('mongodb://localhost/test');

let server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true})); //middleware function let bodyParser module
server.use(session({secret: 'proba', saveUninitialized: false, resave: false}));
//middleware for public folder for static resources like jQuery, css files etc.
//Set static path
server.use(express.static(path.join(__dirname, 'public'))) //the name 'public' is optional like an argument
                                                        // in the project folder should be created such folder
                                                        //where to put css files etc //because the path is pointing there

server.get('/loginCtrl', get.message);

server.post('/login', action.login);

server.post('/register', upload.single('avatar'), action.register);

//server.post('/register', action.copyImg);

server.listen(3000, function() {
  console.log('Server started');
})
