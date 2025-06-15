const express=require("express")
const { login, Signup } = require("../controller/UserLogin")
const {auth}=require("../middleware/auth")
const {createTodo,DeleteTodo,FetchTodo,UpdateTodo}=require("../controller/TodoLogic")
const router=express()

router.post('/create',auth,createTodo)
router.get('/fetch',auth,FetchTodo)
router.post('/update/:note',auth,UpdateTodo)
router.delete('/delete/:note',auth,DeleteTodo)


module.exports=router