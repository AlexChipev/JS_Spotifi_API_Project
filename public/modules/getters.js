let User = require('./user');
let msg = require('./action');

module.exports.message = (req, res) => {

      res.json(msg.message);
}
