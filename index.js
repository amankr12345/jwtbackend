const express=require('express')
const mongoose=require('mongoose')
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
const authRoute=require('./Route/Routes')
const PORT=8000


app.get('/',()=>{
    console.log("runnging on backend")
})

app.listen(PORT,()=>{
    console.log(`running on server ${PORT}`)
})
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,{UseNewUrlParser:true},()=>{
    console.log("DB Connected")
})
app.use(express.json(),cors())
app.use('/app',authRoute)