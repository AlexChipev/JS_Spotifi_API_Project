let User = require('./user');
let fs = require('fs-extra');

const user = new User();

module.exports.login = (req, res) => {

    const pass = req.body.login_pass;
    const email = req.body.login_email;

    User.find({
        email: email
    }, (err, object) => {
        if (object.length !== 0 && object[0].password === pass) {
            module.exports.message = object[0].username;
            module.exports.avatar = object[0].image_path;
            res.redirect('/home.html');
        } else {
            module.exports.message = 'Wrong email or password!';
            res.redirect('/');
        }
    });
};

module.exports.register = (req, res) => {

    let request = req;
    let response = res;

    imgAdd(req, res);

    registration(req, res, imgAdd(req, res));

}

function imgAdd(req, res) {

    if (req.file === undefined) {
        module.exports.message = 'Choose an avatar!';
        return res.redirect('/');
    } else {
        user.image_path = req.file.filename;
    }
}

function registration(req, res, image_path) {

    user.username = req.body.userName;
    user.password = req.body.password;
    user.email = req.body.email;

    if (req.body.password !== req.body.confPassword) {
        module.exports.message = 'Passwords do not match!';
        return res.redirect('/');
    } else {
        User.find({
            email: user.email
        }, (err, object) => {
            if (object.length === 0) {
                user.save();
                module.exports.message = user.username;
                module.exports.avatar = user.image_path;
                res.redirect('/home.html');
            } else {
                module.exports.message = 'Email already exists!';
                res.redirect('/');
            }
        });
    }
}
