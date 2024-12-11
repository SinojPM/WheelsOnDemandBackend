const sales = require('../models/salesModel')

exports.addToSalesController = async (req,res)=>{
    console.log("inside addToSalesController");
    
    const {bookingId,vehicleId,userId,userName,userEmail,paidAmound,paymentMode} = req.body
    console.log(req.body);
    
    try{
        const newSale = new sales({
            bookingId,vehicleId,userId,userName,userEmail,paidAmound,paymentMode,paymentDate:new Date().toLocaleDateString()
        })
        await newSale.save()
        res.status(200).json(newSale)
        
    }catch(err){ 
        res.status(401).json(err)
    }
}
exports.getSalesController = async (req,res)=>{
    console.log("inside getSalesController");
    try{
        const salesDetails = await sales.find()
        res.status(200).json(salesDetails)
    }catch(err){
        res.status(401).json(err)
    }
    
}