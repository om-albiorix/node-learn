// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from 'express'

const app =express()

dotenv.config({
    path:"./env"
})

console.log(process.env,"dotenv") 

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at PORT ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err,"err")
    console.log("MONGO db connection failed!!!")
})
 

