const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    company_code:{
        type: String,
        required: true, 
        default: null      
    },
    company_name:{
        type: String,
        required: true,
        default: null
    },
   company_about:{
        type: String,
        required: true,
        default: null
   }
});

const Company = module.exports = mongoose.model('company', companySchema);


module.exports.addcompany = (companyObj,callback) => {
    Company.find( { $and : [{
          $or: [
            {company_code: companyObj.company_code },
            {company_name: companyObj.company_name}
          ]
        }
    ] }, function (err, docs){
        if(docs.length > 0){callback({status:false , data : "Already Company Name / Company Code Exit"})}
        else{
            Company.create(companyObj,(err,company)=>
            {
                if(err) { callback ({status: false , data: err })}
                else { if (company) {callback ({status:true , data: company})}} 
            })
        }
    })
}


module.exports.updateCompany = (updateObj,callback) =>{
    let query = {_id:updateObj._id};
    Company.find({company_name:updateObj.company_name},(error,data)=>{
        if(error)
        {
            callback({status:false,data:error})
        }
        else{
            if(data.length > 0)
            {
                callback({status:false,data:"Already Company Name Exist"})  
            }
            else{
                Company.update(query, {$set: updateObj}, { new: true, useFindAndModify: false }, (error , updatedDocs) =>{
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
        }
    })
}