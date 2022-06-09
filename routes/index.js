var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var SMSCtrl=require('../controller/smscontroller')
// const loginRouter = require('./login')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.use(loginRouter);
// router.use('/users', usersRouter);


router.get('/get-sms',SMSCtrl.getAll)
router.post('/send-sms',SMSCtrl.sendSMS)
router.put('/resend-sms/:id',SMSCtrl.resendSMS)

module.exports = router;
