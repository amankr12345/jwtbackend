const jwt=require('jsonwebtoken')
const User=require('../Model/user')

module.exports=async (req,res,next)=>{
    let token
    const {authorization}=req.headers
    if(authorization && authorization.startswith('Bearer')){
        try{
            token=authorization.split(' ')[1]

            //verify token
            const {userID}=jwt.verify(token,process.env.TOKEN_SECRET)

            //get user from token

            //req.user=await User.findById(userID).select(-password)
            next()
        }
        catch(err){
            console.log(err)
            res.status(401).send({"msg":"Unauthorized user"})
        }
    }
    if(!token){
        res.status(401).send({"msg":"no token"})
    } 

     
}