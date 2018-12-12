const digitReaController = require('../controllers/digit_req.controller');

module.exports = (app) => {        
    app.post('/digitReq', [
        digitReaController.getDigit
    ])
}