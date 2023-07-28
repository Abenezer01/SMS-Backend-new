var express = require("express");
var router = express.Router();
var userCtrl = require("../controller/usercontroller");
router.get("/", userCtrl.getAll);
module.exports = router;
