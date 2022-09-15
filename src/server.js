import express from 'express'
import { connectDB } from './config/mongodb'
import { env } from '*/config/environment.js'

const app = express()

const hostname = 'localhost'
const port = 8000

connectDB()

app.get('/',(req,res)=>{
    res.end('<h1>Hello TIzz</h1>')
})

app.listen(env.PORT,env.HOST,()=>{
    console.log("hello duy thanh");
})

