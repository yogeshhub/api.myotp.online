const { Subject } = require('rxjs');
const appAuthModel = require('../models/app_auth.model');
const utility = require('../../common/utility');

const ob = new Subject();

sendDigits = (req, res) => {
    appAuthModel.sendFinalDigits(req.body)
        .then((user) => {
            let resData = utility.responseBuilder(user);

            if (resData.data) {
                ob.next();
                resData.statusInfo.message = "Digits received successfully.";
            }

            res.send(resData);
        })
};

module.exports = {
    ob: ob,
    sendDigits: sendDigits
}