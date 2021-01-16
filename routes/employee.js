var express  =   require('express');
var router   =   express.Router();
var Employee  =   require("../model/helpers/employee");
var Auth     =   require("../model/helpers/Auth")


router.post('/create', Auth.checkAdmin ,(req, res) => 
{
  let employeeObj =   req.body; 
  Employee.addemployee(employeeObj,(error, data) => 
  {
    if(error){res.send(error)}
    else{if(data){res.send(data)}}
  });
});


router.post('/update',Auth.checkAdmin,(req,res) =>{
    let updateObj = req.body;
    Employee.updateemployee(updateObj,(error,data) =>{
        if(error){res.send(error)}
        else{if(data){res.send(data)}}
    })
});



router.post('/subordinate',Auth.checkAdmin,(req,res) =>{
    let subObj = req.body;
    Employee.updateemployee(subObj,(error,data) =>{
        if(error){res.send(error)}
        else{if(data){res.send(data)}}
    })
});


router.get('/search/:_searchString',Auth.checkAdmin,(req,res)=>{
    let searchString = req.params._searchString;
    Employee.aggregate([
    {
      $match: {
        $or: [
      {
        employee_code: {
          $regex: searchString ,
          $options: 'i'
          }
      },
       {
        employee_name: {
          $regex: searchString ,
          $options: 'i'
          }
       } ,
         {
          employee_contact: {
            $regex: searchString ,
            $options: 'i'
            }
         } 
            ]
    }
  }
  ],
   async function( err,docs) {
    try{
      res.send({docs})
    }
    catch (err) {
      return res.status(404).json({
        error: err.message
      });
  }
  })
  })


router.get('/getall',Auth.checkAdmin,(req,res)=>{
    Employee.find(function (err, results) {
      if(err){
              res.send({status:false,err})
             }
    res.send({status: true, results});
    });
});


module.exports = router;