var express  =   require('express');
var router   =   express.Router();
var Company  =   require("../model/helpers/company");
var Auth     =   require("../model/helpers/Auth")


router.post('/create', Auth.checkAdmin ,(req, res) => 
{
  let companyObj =   req.body; 
  Company.addcompany(companyObj,(error, data) => 
  {
    if(error){res.send(error)}
    else{if(data){res.send(data)}}
  });
});


router.post('/update',Auth.checkAdmin,(req,res) =>{
    let updateObj = req.body;
    Company.updateCompany(updateObj,(error,data) =>{
        if(error){res.send(error)}
        else{if(data){res.send(data)}}
    })
});

router.get('/getall',Auth.checkAdmin,(req,res)=>{
  Company.find(function (err, results) {
    if(err){
        res.send({status:false,err})
    }
res.send({status: true, results});
  });
});






module.exports = router;