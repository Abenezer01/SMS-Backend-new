var express = require("express");
var SMSCtrl = require("../controller/smscontroller");

var router = express.Router();
var usersRouter = require("./users");
var applicationRouter = require("./application");
const loginRouter = require("./login");
const smsRouter = require("./sms");

/* SMS ROUTER */
router.use("/sms", smsRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// router.use(loginRouter);
router.use("/users", usersRouter);

router.get("/get-sms", SMSCtrl.getAll);
router.post("/send-sms", SMSCtrl.sendSMS);
router.put("/resend-sms/:id", SMSCtrl.resendSMS);

router.use("/applications", applicationRouter);
module.exports = router;
