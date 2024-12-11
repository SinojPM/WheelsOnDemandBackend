const recentviews = require('../models/recentViewModel')

exports.addrecentViewController = async(req,res)=>{
    const {vehicleId,make,model,image,rate} = req.body
    const userId = req.userId
    
    try{
        const existingRecentView = await recentviews.findOne({userId,vehicleId})
        if(existingRecentView){
            console.log(existingRecentView);
            res.status(406).json("already exists")
        }else{
            console.log(req.body);
            const newData = new recentviews({
                userId,vehicleId,make,model,image,rate
            })
            await newData.save()
            res.status(200).json(newData)
        }
    }catch(err){
        res.status(401).json(err)
    }

}

exports.getRecentViewController = async(req,res)=>{
    const userId = req.userId
    try{
        const usersRecentViews = await recentviews.find({userId}).limit(8) 
        console.log(usersRecentViews);
        
        res.status(200).json(usersRecentViews)
    }catch(err){
        res.status(401).json(err)
        
    }
}