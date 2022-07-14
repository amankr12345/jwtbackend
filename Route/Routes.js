const router=require('express').Router()
const CONTROLLER=require('../Controller/controller')
const verify=require('../Route/authRoute')
router.post('/signup',CONTROLLER.signUp)
router.post('/login',CONTROLLER.login)
router.get('/getall',verify,CONTROLLER.getAllUser)
module.exports=router