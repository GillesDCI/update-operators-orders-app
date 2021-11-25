const {Schema, model} = require('mongoose');

const teaSchema = new Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    dateCreated:{type:Date, required:true, default:Date.now},
    category:{type:String, required:true, enum:{
        values:['GREENTEA', 'OOLONGTEA', 'BIOTEA', 'ORGANICTEA'],
        message:'{VALUE} is not supported' //OTHERTEA is not supported
    }},
    price:{type:Number, required:true}
});

const Tea = model('Tea', teaSchema);

module.exports = Tea;