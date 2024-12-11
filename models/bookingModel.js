const mongoose = require("mongoose")

const bookingSchema =new mongoose.Schema({
    userId:{
        type:String,
        required:true

    },
    vehicleId:{
        type:String,
        required:true
    },
    registrationNumber:{
        type:String,
        required:true

    },
    Make:{
        type:String,
        required:true
    },
    Model:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true

    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    identification:{
        type:String,
        required:true
    },
    bookedOn:{
        type:String,
        required:true
    },
    bookedFor:{
        type:Object,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    ratePerDay:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    }
})

const bookings = mongoose.model("bookings",bookingSchema)
module.exports = bookings