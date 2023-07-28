const { messages, Sequelize, Application } = require("../models");
const Op = Sequelize.Op;
const { SendSMS } = require("./vonageCtrl");
let self = {};

self.getAll = async (req, res) => {
  try {
    let data = await messages.findAll();
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await messages.findOne({
      attributes: ["id", "name", "description"],
      where: {
        id: id,
      },
    });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

self.search = async (req, res) => {
  try {
    let text = req.query.text;
    let data = await messages.findAll({
      attributes: ["id", "name", "description"],
      where: {
        name: {
          [Op.like]: "%" + text + "%",
        },
      },
    });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
self.resendSMS = async (req, res) => {
  // SendSMS(phone,content)
  try {
    let id = req.params.id;
    let { phone, content } = await messages.findOne({
      where: {
        id: id,
      },
    });
    return SendSMS(phone, content)
      .then(async (response) => {
        let data = await messages.update(
          { status: true },
          {
            where: {
              id: id,
            },
          }
        );
        return res.json({
          message: "Message resend successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } catch (error) {
    res.send(error);
  }
};

self.sendSMS = async (req, res) => {
  const { content, phone, full_name } = req.body;

  // SendSMS(phone,content)

  return SendSMS(phone, content)
    .then((response) => {
      saveMessages({ content, full_name, phone, status: true }, res);
      res.json({ message: "Message sent successfully!!" });
    })
    .catch((err) => {
      console.log(err);
      saveMessages({ content, full_name, phone, status: false }, res);
      res.send(err);
    });
};
self.sendSMSFromOutside = async (req, res) => {
  const { content, phone, full_name, API_KEY, APP_NAME } = req.body;

  const app = Application.get({
    where: {
      api_key: API_KEY,
      name: APP_NAME,
    },
  });
  if (!app) {
    return res
      .status(400)
      .json({ error: "Bad request. Missing required fields." });
  }
  // SendSMS(phone,content)

  return SendSMS(phone, content)
    .then((response) => {
      saveMessages({ content, full_name, phone, status: true }, res);
      res.json({ message: "Message sent successfully!!" });
    })
    .catch((err) => {
      console.log(err);
      saveMessages({ content, full_name, phone, status: false }, res);
      res.send(err);
    });
};
const saveMessages = async (body, res) => {
  try {
    let data = await messages.create(body);
    return await data.save();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

self.update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await messages.update(body, {
      where: {
        id: id,
      },
    });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await messages.destroy({
      where: {
        id: id,
      },
    });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = self;
