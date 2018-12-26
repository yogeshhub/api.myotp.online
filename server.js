const express = require('express');
const bodyParser = require('body-parser');
const app_config = require('./config/app.properties');
const router = express.Router();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
const Utility = require('./app/common/utility');

let myLogger = function (req, res, next) {    
    //let encreq = Utility.encrypt(req.body);             
    let decrypted = JSON.parse(Utility.decrypt(req.body.data));    
    req.body = decrypted;    
    next()
}

//app.use(myLogger)

const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');

var ob = new Subject();

// define a simple route
app.post('/', (req, res) => {  
    console.log("web app requeted");
    ob.subscribe(() => {
        console.log("app authentication done");
        res.json({ "same": "adsfd" });                
    })               
});

// Importing routes
// app.use(require('./app/send_otp/routes/send_otp.route')(app));
// app.use(require('./app/digit_req/routes/digit_req.route')(app));
// app.use(require('./app/app_auth/routes/app_auth.route')(app));

app.use(require('./app/send_otp/routes/send_otp.route'));

// define a simple route
app.get('/second', (req, res) => {    
    setTimeout(() => {
        console.log("app authentication initial req");    
        res.json({ "second": "done" });               
        ob.next();         
    },2000);    
});

const port = process.env.PORT || app_config.port;

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});