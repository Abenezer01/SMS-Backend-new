var express = require("express");
var router = express.Router();



router.post("/send-sms", function (req, res, next) {
  // console.log('accountsid',accountSid)
  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
      res.send({"err":err});
    } else {
      res.send(responseData)
      if (responseData.messages[0]["status"] === "0") {
        console.log(".");
      } else {
        res.send(
          
        );

        // console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      }
      
    }
  });
});

module.exports = router;
