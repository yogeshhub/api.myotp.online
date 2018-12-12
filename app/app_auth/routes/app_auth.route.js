const appAuthCtrl = require('../controllers/app_auth.controller');

module.exports = (app) => {        
    app.post('/appRequest', [
        appAuthCtrl.sendDigits
    ])
}