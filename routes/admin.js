var express = require('express');
var router = express.Router();
var User = require("../model/helpers/admin");
var Auth = require("../model/helpers/Auth")


router.post('/create',(req, res) => {
  let userObj =   req.body; 
  User.addAdmin(userObj,(error, data) => 
  {
    if(error){res.send(error)}
    else{if(data){res.send(data)}}
  });
});


router.post('/login', (req, res)  => {
  let userObj = req.body;
    User.loginAdmin(userObj, (error, data) =>
    {
      if(error){res.send(error)}
      else{if(data){res.send(data)}}
    });
});


router.get('/checkAdmin',Auth.checkAdmin,(req,res)=>{
  res.send({status:true})
})




module.exports = router;