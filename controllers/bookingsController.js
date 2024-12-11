const bookings = require('../models/bookingModel')
const moment = require('moment');
const vehicles = require('../models/VehicleModel');



exports.addToBookingsController = async (req,res)=>{
    console.log("inside addToBookingsController");
    const {vehicleId,registrationNumber,Make,Model,name,phoneNumber,email,identification,bookedFor,image,ratePerDay,total} = req.body
    const userId = req.userId
    console.log(userId);
    
    const bookedOn = moment().format() 
    console.log(bookedFor);
    const startDate = moment(bookedFor.startDate).format('L')
    const endDate = moment(bookedFor.endDate).format('L')
    var indexOfDate = 0
    
    try{
        const vehicleBooking = await bookings.find({vehicleId})
        console.log(vehicleBooking);
        
        var isAvailable = true
        if (vehicleBooking) {
            

            vehicleBooking.map(vehicle=>vehicle.bookedFor).forEach((item,index)=>{
                const firstDate = moment(item.startDate).format('L')
                const secondDate = moment(item.endDate).format('L')
                console.log(firstDate,secondDate);
                if(moment(startDate).isBetween(firstDate,secondDate,undefined,[]) || moment(endDate).isBetween(firstDate,secondDate,undefined,[])){
                    isAvailable=false 
                    indexOfDate = index
                    
                }else{
                    isAvailable=true
                    console.log(isAvailable);
                }
            })
            if (isAvailable) {
                
                    const newBooking = new bookings({
                        userId,vehicleId,registrationNumber,Make,Model,name,phoneNumber,email,identification,bookedOn,bookedFor,image,ratePerDay,total,status:"booked",paymentStatus:"pending"
                    })
                    await newBooking.save()
                    res.status(200).json(newBooking)
            }else{
                
                res.status(404).json(`not available for the dates ${vehicleBooking.map(vehicle=>`${vehicle.bookedFor.startDate}-${vehicle.bookedFor.endDate}`)[indexOfDate]} try other Dates`)
            }
            
        }else{
            const newBooking = new bookings({
                userId,vehicleId,registrationNumber,Make,Model,name,phoneNumber,email,identification,bookedOn,bookedFor,image,ratePerDay,total,status:"booked",paymentStatus:"pending"
            })
            await newBooking.save()
            res.status(200).json(newBooking)
        }
        
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.getUserBookings = async(req,res)=>{
    const userId = req.userId

    try{
        const userBookings =  await bookings.find({userId})
        res.status(200).json(userBookings)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getBookingsOnAdminController = async (req,res)=>{
    console.log("inside getBookingsOnAdmin");
    const searchKey = req.query.search
    console.log(searchKey);
    
    const query = {
        name:{$regex:searchKey,$options:"i"}
    }
    try{
        const allBookings = await bookings.find(query)
        res.status(200).json(allBookings)
    }catch(err){
        res.status(401).json(err)
    }
    
}
exports.getUserBookingsOnAdmin = async (req,res)=>{
    console.log("getUserBookingsOnAdmin")
    const {uid} = req.params
    console.log(uid);

    try{
        const userBookingsOnAdmin = await bookings.find({userId:uid})
        console.log(userBookingsOnAdmin);
        
        res.status(200).json(userBookingsOnAdmin)
    }catch(err){
        res.status(401).json(err)
    }

    
}

exports.getAllBookingsOnDashboardController = async (req,res)=>{
    console.log("inside getAllBookingsOnDashboardController");
    try{
        const allBookings = await bookings.find({})
        res.status(200).json(allBookings)
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.getBookingsOnViewController = async (req,res)=>{
    console.log("getBookingsOnViewController");
    const {bid} = req.params
    console.log(bid);
    
    try{
        const booking = await bookings.findOne({_id:bid})
        console.log(booking);
        
        res.status(200).json(booking)
    }catch(err){
        console.log("err");
        
        res.status(401).json(err)
    }
}
exports.updatePaymentStatusController = async (req,res)=>{
    console.log("inside updatePaymentStatusController");
    
    const {bid} = req.params
    console.log(bid);
    try{
        const existingBooking = await bookings.findOne({_id:bid})
        if(existingBooking){
            existingBooking.paymentStatus="paid"
            await existingBooking.save()
            res.status(200).json(existingBooking)
        }else{
            res.status(404).json("not found")
        }
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.updateBookingStatusController = async (req,res)=>{
    console.log("inside updateBookingStatusController");
    const {bid} = req.params
    try{
        const existingBooking = await bookings.findOne({_id:bid})
        if(existingBooking){
            existingBooking.status = "picked"
            await existingBooking.save()
            res.status(200).json(existingBooking)
        }
    }catch(err){
        res.status(401).json(err)
    }
    
    
}
exports.updateBookingCompletedController = async (req,res)=>{
    console.log("inside updateBookingCompletedController");
    const {bid} = req.params
    try{
        const existingBooking = await bookings.findOne({_id:bid})
        if(existingBooking){
            existingBooking.status = "completed"
            await existingBooking.save()
            res.status(200).json(existingBooking)
        }

    }catch(err){
        res.status(401).json(err)
    }
    
}
exports.cancelBookingsController = async (req,res)=>{
    const {bid} = req.params
    try{
        const canceledBooking = await bookings.findByIdAndDelete({_id:bid})
        res.status(200).json(canceledBooking)
    }catch(err){
        res.status(401).json(err)
    }
}


