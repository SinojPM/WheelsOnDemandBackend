const mongoose = require("mongoose")

const salesSchema = new mongoose.Schema({
    bookingId:{
        type:String,
        required:true
    },
    vehicleId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    paidAmound:{
        type:Number,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    paymentDate:{
        type:String,
        required:true
    } 
})

const sales = mongoose.model('sales',salesSchema)
module.exports = sales