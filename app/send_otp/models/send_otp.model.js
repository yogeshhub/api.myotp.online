var mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    companyId: String,
    tranId: String,
    mobileNumber: String,
    companyDigit: String,
    middlewareDigit: String,
    status: String
});

const otpModel = mongoose.model('otps', otpSchema);

generateDigit = (userData) => {
    console.log("coming in to the model");
    const user = new otpModel(userData);
    user.status = "alive";
    user.tranId = userData.companyId + Math.floor(Math.random() * 90 + 10) + 'T' + userData.tranId;
    user.middlewareDigit =  Math.floor(Math.random() * 90 + 10);

    return user.save();
};

getUpdatedOtp = (userData) => {
    let query = { 'companyId': userData.companyId, 'mobileNumber': userData.mobileNumber, 'companyDigit': userData.companyDigit, 'status': 'success'};    
  
    return otpModel.find(query, function (err, doc) {
        console.log(doc);
    });
};

module.exports = {
    otpModel: otpModel,
    generateDigit: generateDigit,
    getUpdatedOtp: getUpdatedOtp
};
