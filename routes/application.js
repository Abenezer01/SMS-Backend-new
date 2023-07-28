var express = require("express");
var router = express.Router();
var applicationCtrl = require("../controller/applicationController");

router.get("/", applicationCtrl.getAllApplications);
router.post("/create", applicationCtrl.createApplication);
router.delete("/", applicationCtrl.deleteApplication);
module.exports = router;
