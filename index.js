const express = require('express')
const cors = require('cors')
require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
const oAuth2Strategy = require('passport-google-oauth2').Strategy;
const userController = require("./controllers/userController")
const http = require("http")
const {Server} = require("socket.io")

require('./dbConnection/connection')

const router = require('./routes/router')
const users = require('./models/userModel')
const clientId = "171104893531-tcehgnvr3mb2cf2331hm27ug9hm6ck26.apps.googleusercontent.com"
const clientSecret = "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"

const wodServer = express()
wodServer.use(cors())
wodServer.use(express.json())
wodServer.use(router)
wodServer.use('/uploads',express.static('./uploads'))
wodServer.use(session({
    secret:"wodserver123456789",
    resave:false,
    saveUninitialized:true
}))
wodServer.use(passport.initialize())
wodServer.use(passport.session())
passport.use(new oAuth2Strategy({
    clientID:clientId,
    clientSecret:clientSecret,
    callbackURL:"/auth/google/callback",
    scope:["profile","email"]
},userController.googleSignUpController))

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
const PORT = 3002 || process.env.PORT
socketIoServer.listen(3004,()=>{
    console.log(" socket server is running");
    
})
socketIoServer.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:green;">PF server Started and waiting for client request</h1>')})
io.on("connect",(socket)=>{
    console.log(`user connected`);
    
})

wodServer.listen(PORT,()=>{
    console.log(`wodServer Started at the port ${PORT} and waiting for client request`);
})
wodServer.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:green;">PF server Started and waiting for client request</h1>')
})