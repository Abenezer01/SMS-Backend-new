const { User, Sequelize } = require("./../models");
const bcrypt = require("bcrypt");

let self = {};
const Op = Sequelize.Op;
const saltRounds = 10;

self.getAll = async (req, res) => {
  try {
    let data = await User.findAll();
    return res.json({ users: data, total: data.length });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: "error",
      data: error,
    });
  }
};
self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await User.findOne({
      where: {
        id: id,
      },
    });
    return res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error,
    });
  }
};

self.save = async (req, res) => {
  try {
    let body = req.body;
    const password = bcrypt.hashSync(req.body.password, saltRounds);

    let data = await User.create({ ...body, password });

    return res.json({
      status: "ok",
      message: "user added successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
self.update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await User.update(body, {
      where: {
        id: id,
      },
    });
    return res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      data: error,
    });
  }
};
self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await User.destroy({
      where: {
        id: id,
      },
    });
    return res.json({
      status: "ok",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: error,
    });
  }
};

module.exports = self;
