const express=require("express")
const { login, Signup } = require("../controller/UserLogin")
const router=express()

router.post('/login',login)
router.post('/signup',Signup)


module.exports=router