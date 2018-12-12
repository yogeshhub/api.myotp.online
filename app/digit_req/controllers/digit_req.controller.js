const digitReqModel = require('../models/digit_req.model');
const utility = require('../../common/utility');

getDigit = (req, res) => {
    digitReqModel.getDigits(req.body)
        .then((user) => {
            let resData = utility.responseBuilder(user);

            if(resData.data) {
                resData.data.companyId = user.companyId;
                resData.data.tranId = user.tranId;
                resData.data.mobileNumber = user.mobileNumber;
                resData.data.companyDigit = user.companyDigit;
                resData.data.middlewareDigit = user.middlewareDigit;

                resData.statusInfo.message = "Digits retrieved successfully.";
            }
            
            res.send(resData);
        })
};

module.exports = {
    getDigit: getDigit
}