// // Download the helper library from https://www.twilio.com/docs/node/install
// // Find your Account SID and Auth Token at twilio.com/console
// // and set the environment variables. See http://twil.io/secure
// const Vonage = require('@vonage/server-sdk')

// const VONAGE_API_KEY = '31898f46'
// const VONAGE_API_SECRET = 'QJa930ibTM7xbH2z'
// const from = "Vonage APIs"

// const vonage = new Vonage({
//   apiKey: VONAGE_API_KEY,
//   apiSecret: VONAGE_API_SECRET
// })

// const SendSMS=(to, text)=>new Promise((resolve, reject) =>vonage.message.sendSms(from, to, text, (err, responseData) =>{
//     if (err) {
//         reject(err)
//         return
//     } else {
//         resolve(responseData)
//         if (responseData.messages[0]["status"] === "0") {
//             console.dir(responseData);
//         } else {
//             console.log(
//                 `Message failed with error: ${responseData.messages[0]["error-text"]}`
//             );
//         }
//     }
  
// }));

var telerivet = require('telerivet');
const { decrypt } = require('./crypto');

var tr = new telerivet.API('a7BE5_2RSauSKNX9rn45z8VqqnCUuWpmdEPA');
var project = tr.initProjectById('PJb8a05e3c9bafd692');
const SendSMS=(to, text)=>new Promise((resolve, reject)=>{
    project.sendMessage({
        content: decrypt(text), 
        to_number: to,
    }, function(err, message) {
        if(err){
            reject(err)
        }else{
            resolve(message)
        }
    });
})

module.exports = {SendSMS};
