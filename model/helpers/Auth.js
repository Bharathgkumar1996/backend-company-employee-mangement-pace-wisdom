var jwt      = require('jsonwebtoken');
var config   = require("../../config");
var User     = require("../helpers/admin");
var Helper = require("../helpers/helper");

checkAdmin = (req, res, next) => {
    var bearerHeader = req.headers['authorization'];
    var token;
    req.authenticated = false;
    if(bearerHeader)
    {
      var bearer = bearerHeader.split(" ");
          token = bearer[1];
          str = Helper.base64Decode(token);
          jwt.verify(token, config.jwt.key, function (err, decoded){
            if (err){
                req.authenticated = false;
                req.decoded = null;
                res.status(403).send({status:false,data:"Invalid Token"});
            } else {
                User.count({_id:decoded._id},(error,count)=>{
                    if(count > 0){
                        req.decoded = decoded;
                        req.authenticated = true; 
                        next();
                    }
                    else{
                        if(error){
                          res.status(403).send({status:false,data:"Invalid Token"});   
                        }
                    }
                })                  
            }
        });
    }
    else
    {
        return res.status(404).send({status:false,data:"Login Required"})
    }
}

module.exports = {
    checkAdmin
}