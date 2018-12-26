const SendOtpController = require('../controllers/send_otp.controller');

module.exports = (app) => { 
    console.log("generate digit got in route");   
    app.post('/generateDigit', [        
        SendOtpController.insert
    ]);
}

// const express = require('express');
// var router = express.Router();

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
// })

// router.post('/generateDigit', [        
//     SendOtpController.insert
// ]);

// module.exports = router;