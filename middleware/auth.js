const jsonwebtoken=require("jsonwebtoken")
exports.auth=(req,res,next)=>{
try{
const authHeader = req.headers.authorization;

    // Check if Authorization header is present and formatted correctly
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

const decode=jsonwebtoken.decode(token)
req.user=decode
next()

}
catch(e)
{
 return res.status(500).json({
        success:false,
        message:e.message
    })  
}
}