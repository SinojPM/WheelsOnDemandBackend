
const { response } = require('express');
const vehicles = require('../models/VehicleModel');

exports.addVehicleController = async (req,res)=>{
    console.log("inside addVehicleController");
    const {model,make,yearOfRegistration,registrationNumber,transmission,fuelType,rate,condition} = req.body
    
    try{
        const existingVehicle =await vehicles.findOne({registrationNumber})
        if(existingVehicle){
            res.status(406).json("vehicle already Exists")
        }else{
            const newVehicle = new vehicles({
                model,make,yearOfRegistration,registrationNumber,transmission,fuelType,rate,condition,image:req.file.filename,status:"available"
            })
            await newVehicle.save()
            res.status(200).json(newVehicle)
        }
    }catch(err){
        res.status(401).json(err)
    }
}
exports.getAllVehiclesOnGarageController = async (req,res)=>{
    console.log("inside getAllVehiclesOnGarageController");
    const searchKey = req.query.search
    const query = {
        registrationNumber:{$regex:searchKey,$options:"i"}
    }
    try{
        const allVehicles = await vehicles.find(query)
        res.status(200).json(allVehicles)
    }catch(err){
        res.status(401).json(err)
    }
    
}
exports.getAllVehiclesController = async (req,res)=>{
    console.log("inside getAllVehiclesController");
    try{
        const allVehicles = await vehicles.find()
        res.status(200).json(allVehicles)
    }catch(err){
        res.status(401).json(err)
    }
    
}
exports.getAllVehiclesForUserController = async (req,res)=>{
    console.log("inside getAllVehiclesForUserController");
    const searchKey = req.query.search
    const query = {
        model:{$regex:searchKey,$options:"i"}
    }
    try{
        const allVehicles = await vehicles.find(query)
        res.status(200).json(allVehicles)
    }catch(err){
        res.status(401).json(err)
    }
    
    
}

exports.getVehicleInViewController = async (req,res)=>{
    const {vid} = req.params
    try{
        const vehicle = await vehicles.findOne({_id:vid})
        res.status(200).json(vehicle)
    }catch(err){
        res.status(200).json(err)
    }
}

exports.getHomeVehiclesController = async(req,res)=>{
    console.log("inside Home Vehicles Controller");
    
    try{
        const homeVehicles = await vehicles.find().limit(5)
        res.status(200).json(homeVehicles)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.deleteVehicleController = async(req,res)=>{
    const {id} = req.params
    try{
        const deletedVehicle = await vehicles.findByIdAndDelete(id)
        res.status(200).json(deletedVehicle)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.editVehicleDetailsController = async(req,res)=>{
    console.log("inside editVehicleDetailsController");
    
    const {model,make,yearOfRegistration,registrationNumber,transmission,fuelType,rate,condition,image} = req.body
    const {vid} = req.params
    const uploadImage = req.file?req.file.filename:image
    try{
    console.log(req.body);

        const editedVehicle=await vehicles.findByIdAndUpdate({_id:vid},{
            model,make,yearOfRegistration,registrationNumber,transmission,fuelType,rate,condition,image:uploadImage,status:"available"
        },{new:true})
        await editedVehicle.save()
        res.status(200).json(editedVehicle)
    }catch(err){
        res.status(401).json(err)
    }

}

