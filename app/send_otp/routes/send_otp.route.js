const SendOtpController = require('../controllers/send_otp.controller');

module.exports = (app) => {    
    app.post('/generateDigit', [        
        SendOtpController.insert
    ]);
}