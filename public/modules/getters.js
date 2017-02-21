let User = require('./user');
let msg = require('./action');

module.exports.message = (req, res) => {
    res.json(msg.message);
}

module.exports.send_avatar = (req, res) => {
    res.json(msg.avatar);
}
