let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mongoose = require('mongoose');
let action = require('./public/modules/action');
let get = require('./public/modules/getters');
let multer = require('multer')
let upload = multer({
    dest: path.join(__dirname, './public/avatars/')
});
mongoose.Promise = require('bluebird');

let User = require('./public/modules/user');
mongoose.connect('mongodb://localhost/test');

let server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(express.static(path.join(__dirname, 'public')));

server.get('/loginCtrl', get.message);

server.get('/avatar', get.send_avatar);

server.post('/login', action.login);

server.post('/register', upload.single('avatar'), action.register);

server.listen(3000, function() {
    console.log('Server started');
})
