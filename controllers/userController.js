const { response } = require('express');
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registerController = async (req, res) => {
    console.log('inside registerController');
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("account already exists")
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptedPassword, joiningDate: new Date().toLocaleDateString(), profilePic: ""
            })
            newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }


}

exports.loginController = async (req, res) => {
    console.log("inside LoginController");
    const { email, password } = req.body
    console.log(email,password);
    
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (existingUser.password == password || isMatch) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
                res.status(200).json({
                    user: existingUser, token
                })
            } else {
                res.status(404).json("Invalid password")
            }
        }else{
            res.status(404).json("invalid email")
        }
    } catch (err) {
        res.status(401).json(err)
    }
}
exports.getAllUsersControllerWithSearch = async(req,res)=>{
console.log("inside getAllUsersController ");
    const searchKey = req.query.search
    const query = {
        email:{$regex:searchKey,$options:"i"}
    }
    try{
        const allUsersWithSearch = await users.find(query)
        res.status(200).json(allUsersWithSearch)
    }catch(err){
        res.status(401).json(err)
    }

}

exports.getUsersOnDashBoardController = async(req,res)=>{
    console.log("inside getUsersOnDashBoardController");
    try{
        const totalUsers = await users.find()
        res.status(200).json(totalUsers)
    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.googleSignUpController = async(accessToken,refreshToken,profile,done)=>{
    console.log("inside google SignUp Controller");
    console.log(profile);
    
    try{
        let existingUser = await users.findOne({googleId:profile.id})
        if (!existingUser) {
            const newUser = new users({
                username:profile.displayName,
                email:profile.emails[0].value,
                role:"user",
                joiningDate:new Date().toLocaleDateString(),
                profilePic:profile.photos[0].value,
                googleId:profile.id

            })
           await newUser.save()
           return done(null,newUser)
        }else{
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            return done(null,existingUser)
        }

    }catch(err){
        return done(err,null)
    }}

exports.googleSignInController  = async(req,res)=>{
    console.log("inside googleSignInController");
    const {email,googleId} = req.body
    console.log(req.body);
    
    if(email && googleId){
        try{
            const existingUser = await users.findOne({email,googleId})
            console.log(existingUser);
            
            if(existingUser){
                const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
                res.status(200).json({
                    user:existingUser,token
                })
            }
            else{
                res.status(406).json("User Not found proceed to login")
            }
        }catch(err){
            res.status(401).json("err")
        }

    }else{
        res.status(406).json("error getting data please Try after some time")
    }
    
}