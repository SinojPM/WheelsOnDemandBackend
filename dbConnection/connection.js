const mongoose = require('mongoose')

const dbConnection = process.env.CONNECTION_STRING

mongoose.connect(dbConnection).then(res=>{
    console.log("connection established with mongoDb atlas");
    
}).catch(err=>{
    console.log("failed to connect with atlas");
    console.log(err); 
})