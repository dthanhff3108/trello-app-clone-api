import express from 'express'
import { connectDB } from './config/mongodb'
import { env } from '*/config/environment.js'
import { apiV1 } from '*/routes/v1'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

connectDB()
    .then(() => console.log("Connected"))
    .then(() => bootServer())
    .catch(err=>{
        console.log(err)
        process.exit()
    })


const bootServer = () => {
    const app = express()
    // Config req.body data
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/v1',apiV1)
    app.get('/', async (req,res)=>{
        res.end('<h1>Hello TIzz</h1>')
    })
    
    app.listen(env.APP_PORT,env.APP_HOST, () => {
        console.log("hello duy thanh");
    })
}


// createNew()