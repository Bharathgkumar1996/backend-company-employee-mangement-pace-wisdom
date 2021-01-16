const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');




AdminRoute    = require("./routes/admin");
CompanyRoute  = require("./routes/company");
EmployeeRoute = require("./routes/employee");


const PORT = process.env.PORT || 5000;


app.use(express.static(__dirname));
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit:50000
}));



   
app.use(cors());
mongoose.connect('mongodb://localhost/mangement', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;

app.get('/', (req, res) => {
    res.send("Start Server");
});


User     =   require("./model/helpers/admin");
Company  =   require("./model/helpers/company");
Employee =   require("./model/helpers/employee")

app.use("/admin",AdminRoute);
app.use("/company",CompanyRoute);
app.use("/employee",EmployeeRoute);



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    var origin = req.headers.origin;
    if(origin == undefined) res.sendStatus(403);
    else{
        let origins = config.me.origins;
        if(origins.indexOf(origin) > -1){
            res.header('Access-Control-Allow-Origin', origin);
            next();
        }else{
            res.sendStatus(403);
        }
    }
});

app.listen(PORT , console.log(`SERVER RUNNING ON PORT ${PORT}`))

