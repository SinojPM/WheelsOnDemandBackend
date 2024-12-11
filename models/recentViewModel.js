const mongoose = require('mongoose')

const recentViewSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    vehicleId:{
        type:String,
        required:true
    },
    make:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    }
})

const recentviews = mongoose.model("recentviews",recentViewSchema)
module.exports = recentviews