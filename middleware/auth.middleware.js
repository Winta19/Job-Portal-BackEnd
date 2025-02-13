const jwt = require("jsonwebtoken");
 auth = (role)=>{
 return (req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No token, authorization denied"});

    }else{
        try {
            const decode = jwt.verify(token, 'secret');
            console.log('decode');
            console.log(decode);
            if(role.includes(decode.data.role)){
                req.user = decode;
                next();
            }else{
                return res.status(401).json({message:"Authorization denied"});
            }
            
           
            
        } catch (error) {
            return res.status(401).json({message:"Token is not valid, authorization denied"});
        }  
    }
}
}

module.exports = {auth}