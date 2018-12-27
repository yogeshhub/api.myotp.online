const sendOtpModel = require('../models/send_otp.model');
const appAuthCtrl = require('../../app_auth/controllers/app_auth.controller');
const utility = require('../../common/utility');

exports.insert = (req, res) => {    
    sendOtpModel.generateDigit(req.body)
        .then((result) => {
            if(result) {
                appAuthCtrl.ob.subscribe(() => {
                    sendOtpModel.getUpdatedOtp(req.body)
                        .then((user) => {
                            let resData = utility.responseBuilder(user);

                            if(resData.data) {                            
                                resData.statusInfo.message = "Digits retrieved successfully.";
                            }

                            res.send(resData);
                        })                
                });
            } else {
                let resData = utility.responseBuilder(result);
                resData.errorInfo.message = "Unable to generate otp";
                res.send(resData);
            }           
        });
};