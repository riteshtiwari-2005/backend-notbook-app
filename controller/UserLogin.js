const User=require("../model/User")
const bycrypt=require("bcryptjs")
const jsonwebtoken=require("jsonwebtoken")
exports.Signup=async(req,res)=>{
try{
const {name,email,password}=req.body

if(!name || !email|| !password)
{
    return res.status(401).json({
        success:false,
        message:"Filed Not Should Empty"
    })
}

const checkuser=await User.findOne({email})
if(checkuser)
{
   return res.status(401).json({
        success:false,
        message:"User Already Exist"
    })  
}

const hashpassword=await bycrypt.hash(password,10)
const UserSaved=await User.create({
    name,
    email,
    password:hashpassword
})

return res.status(200).json({
    success:true,
    UserSaved,
    message:"User Signup Success"
})
}

catch(error)
{
return res.status(500).json({
        success:false,
        message:error.message
    })  
}



}

exports.login=async(req,res)=>{
try{
const {email,password}=req.body
if(!email || !password)
{
    return res.status(401).json({
        success:false,
        message:"Filed Not Should Empty"
    })
}

const checkuser=await User.findOne({email})
if(!checkuser)
{
   return res.status(401).json({
        success:false,
        message:"User Not Found with this email"
    })  
}
if(bycrypt.compare(password,checkuser.password))
{
    checkuser.password=null
const token=jsonwebtoken.sign({checkuser},process.env.JWT_KEY,{expiresIn:'1h'})
return res.status(200).json({
    success:true,
    token,
    message:"Login Success"
})


}

else
{
     return res.status(401).json({
        success:false,
        message:"Password is Invalid"
    })  
}


}

catch(error)
{
  return res.status(500).json({
        success:false,
        message:error.message
    })    
}


}