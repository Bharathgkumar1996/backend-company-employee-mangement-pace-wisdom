const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    employee_code:{
        type: String,
        required: true, 
        default: null      
    },
    company_code:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        default:null,   
    },
    employee_name:{
        type: String,
        required: true,
    },
    employee_contact:{
        type: String,
        required: true
    },
   employee_designation:{
        type: String,
        enum: ['manager', 'cenior-developer', 'team-Lead' , 'junior-developer'],
        required: true,
   },
   reporting_mangaer:{
    type: mongoose.Schema.Types.ObjectId,
    default:null,  
   },
   bind_to:{
        type: mongoose.Schema.Types.ObjectId ,
        default: null
   }
});

const Employee = module.exports = mongoose.model('employee', employeeSchema);


module.exports.addemployee = (employeeObj,callback) => {
    Employee.find( { $and : [{
          $or: [
            {employee_code: employeeObj.employee_code },
            {employee_contact: employeeObj.employee_contact}
          ]
        }
    ] }, function (err, docs){
        if(docs.length > 0){callback({status:false , data : "Already employee Name / employee Code Exit"})}
        else{
            Employee.create(employeeObj,(err,employee)=>
            {
                if(err) { callback ({status: false , data: err })}
                else { if (employee) {callback ({status:true , data: employee})}} 
            })
        }
    })
}


module.exports.updateemployee = (updateObj,callback) =>{
    let query = {_id:updateObj._id};
    Employee.update(query, {$set: updateObj}, { new: true, useFindAndModify: false }, (error , updatedDocs) =>{
        if (error)
        {
            callback({status:false , data : error})
        }
        else{
            if(updatedDocs)
            {
                callback({status:true,data : updatedDocs})
            }
        }
    });
}


module.exports.searchEmployee = (empObj,callback) =>{
    Employee.findOne(empObj, function (error, user) {
       if(error)
       {
           callback({status:false,data:error})
       }
       else{
           if(user)
           {
               callback({status:true,data:[user]})
           }
           else callback({status:false,data:null})
       }
    })
}

module.exports.addSubordinate = (subObj,callback) => {
    let query = {_id:subObj._id};
    Employee.update(query, {$set: {bind_to: subObj.bind_to}}, { new: true, useFindAndModify: false }, (error , updatedDocs) =>{
        if (error)
        {
            callback({status:false , data : error})
        }
        else{
            if(updatedDocs)
            {
                callback({status:true,data : updatedDocs})
            }
        }
    });
}

