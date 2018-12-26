const SendOtpController = require('../controllers/send_otp.controller');

// module.exports = (app) => { 
//     console.log("generate digit got in route");   
//     app.post('/generateDigit', [        
//         SendOtpController.insert
//     ]);
// }
const express = require('express');
var router = express.Router();

router.post('/generateDigit', [        
    SendOtpController.insert
]);

module.exports = router;