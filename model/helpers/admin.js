const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const config = require('../../config');
var jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    user_email:{
        type: String,
        required: true,       
    },
    user_password:{
        type: String,
        required: true,
        default: null
    },
    user_name:{
        type: String,
        required: true,
        default: null
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: null
   }
});

const User = module.exports = mongoose.model('user', userSchema);


module.exports.addAdmin = (userObj,callback) => {
    let CreateUser = (userObj, callback) => {
    User.create(userObj, (error, user) => {
        if(error){ callback({status:false,data:error})}
            else{
                if(user){
                    const salt = bcrypt.genSaltSync(10)
                    const password =  user.user_password;
                    user.user_password = bcrypt.hashSync(password, salt); 
        try 
            {
                user.save(function (error , data) { 
                    if(error){callback({status:false,data:error})}
                    else{
                        if(data){callback({status:true,data:data})}
                    }
                    })
            } 
        catch(e) {errorHandler(e)}}}
    })} 

    User.count({user_email: userObj.user_email}, function (error, count)
    {
        if(count>0){callback({status:false,data:"Already Exist"})}
        else{
        if(userObj.role == "user"){
            CreateUser(userObj, (error,data)=>{
                if(error){callback(error)}
                else{callback(data)}
            })}
        else{
             User.countDocuments({role: 'admin'}, function(err, c)
              {
                 if(c == 0){
                     CreateUser(userObj, (error,data)=>{
                      if(error){callback(error)}
                      else{callback(data)}})}
                      else{callback({status:false,data:"Limited Access for Admin"})}
              })
         }}
    });
}


module.exports.loginAdmin = (loginObj, callback) => {
    User.findOne({user_email: loginObj.user_email}, function (err, user){ 
        if(!user){callback({status:false,data:"User Not Found"})}
        else{if(user.role == 'admin'){
           let hashpassword =  bcrypt.compareSync( loginObj.user_password , user.user_password);
         if(hashpassword)
         {
           let payload = {username : user.user_email , _id:user._id , role : user.role};
           let options = {expiresIn: config.jwt.timeout};
           jwt.sign(payload , config.jwt.key , options , function (err , token){
             if(err)
             {
              let obj = {status: false, error: err};
              callback(obj);
             }
             else
             {
              user = user.toJSON();
              callback(null, {token, user});
             }})
        }
        else{callback({status:false,data:"Invalid Credentials"}) }}
        else{callback({status:false,data:"Admin Only Allowed"})}}});
}