const User = require('../models/User');
const Box = require('../models/Box');

class BoxController {
  async getAll(req, res) {
    const boxes = await Box.find({});

    return res.json(boxes);
  }

  async store(req, res) {
    const box = await Box.create(req.body);

    req.io.sockets.in(user._id).emit('box', file);

    return res.send(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(box);
  }

  async delete(req, res) {
    await Box.remove(req.params.id);

    return res.json('Pasta excluída.');
  }
}

module.exports = new BoxController();