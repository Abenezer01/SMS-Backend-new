var express = require("express");
var router = express.Router();
var SMSCtrl = require("../controller/smscontroller");

router.post("/send-sms", SMSCtrl.sendSMSFromOutside);
module.exports = router;
