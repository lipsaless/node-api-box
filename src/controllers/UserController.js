const User = require('../models/User');

class UserController {
  async getAll(req, res) {
    const users = await User.find({});

    return res.json(users);
  }

  async store(req, res) {
    
    const user = await User.create(req.body);

    return res.json(user);
  }

  async show(req, res) {
    const user = await User.findById(req.params.id).populate({
      path: 'boxes',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(user);
  }

  // async update(req, res) {
  //   const user = await User.findById(req.params.id);


  // }
}

module.exports = new UserController();