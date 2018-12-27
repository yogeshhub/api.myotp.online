var mongoose = require('mongoose');

const digitReqModel = require('../../send_otp/models/send_otp.model').otpModel;

sendFinalDigits = (userData) => {
  let query = { 'mobileNumber': userData.mobileNumber, 'companyDigit': userData.companyDigit, 'middlewareDigit': userData.middlewareDigit, 'status': 'pending' };
  let update = { status: "success", 'userDigit': userData.userDigit };
  let options = { upsert: false, new: false };
  
  return digitReqModel.findOneAndUpdate(query, update, options, function (err, doc) {
    console.log(doc);
  });

};

module.exports = {
  sendFinalDigits: sendFinalDigits
}
