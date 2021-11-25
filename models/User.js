const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    dateCreated:{type:Date, required:true, default:Date.now},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    username:{type:String, required:true},
    favorites:[{type:String, required:false}] //favorites (categories of products the user likes.)
})


const User = model('User', userSchema);

module.exports = User;