let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let user = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    url_path: [{
        url: String
    }],
    image_path: String

}, {
    collection: 'users'
});

module.exports = mongoose.model('New_User', user);
