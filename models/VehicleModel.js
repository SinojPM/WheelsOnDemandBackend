const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true

    },
    make:{
        type:String,
        required:true,
        
    },
    yearOfRegistration:{
        type:String,
        required:true,
        
    },
    registrationNumber:{
        type:String,
        required:true,
        unique:true
        
    },
    transmission:{
        type:String,
        required:true,
        
    },
    fuelType:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

const vehicles = mongoose.model("vehicles",vehicleSchema)
module.exports = vehicles