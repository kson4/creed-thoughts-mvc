const Message = require("../models/Message");

module.exports = {
  show: async (req, res) => {
    res.render("contact.ejs");
  },
  sendMsg: async (req, res) => {
    await Message.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
    });
    res.redirect("/contact");
  },
};
