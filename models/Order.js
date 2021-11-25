const {Schema, model} = require('mongoose');


const orderSchema = new Schema({
    dateCreated:{type:Date, required:true, default:Date.now},
    orderDescription:{type:String, required:true},
    totalPrice:{type:Number, required:true},
    vat:{type:Number, required:true},
    totalPriceInclVat:{type:Number, required:true},
    user:{type:Schema.Types.ObjectId, ref:'User'}
})


const Order = model('Order', orderSchema);

module.exports = Order;