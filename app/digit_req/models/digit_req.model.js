var mongoose = require('mongoose');

const digitReqModel = require('../../send_otp/models/send_otp.model').otpModel;

getDigits = (userData) => {
  let query = { 'mobileNumber': userData.mobileNumber, 'companyDigit': userData.companyDigit, 'status': "alive" };
  let update = { status: "pending" };
  let options = { upsert: false, new: false, returnNewDocument: true };
  
  otpUpdatePromise = new Promise((resolve, reject) => {
    digitReqModel.findOneAndUpdate(query, update, options, function (err, doc) {
      if(err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });   

  return otpUpdatePromise;
};

module.exports = {
  getDigits: getDigits
}
