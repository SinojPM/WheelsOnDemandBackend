const jwt = require('jsonwebtoken')


const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwtMiddleware");
    
    const token = req.headers["authorization"].split(" ")[1]

    //steps to varify token

    if(token){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            req.userId=jwtResponse.userId
            next()
        }catch(err){
            res.status(401).json("please Login to proceed the step")
        }
    }else{
        res.status(406).json('authentication failed token missing')
    }
    
    
    
}
module.exports = jwtMiddleware