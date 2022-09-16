import express from 'express'
import { connectDB, getDB } from './config/mongodb'
import { env } from '*/config/environment.js'
import { BoardModel } from '*/models/board.model'

connectDB()
    .then(() => console.log("Connected"))
    .then(() => bootServer())
    .catch(err=>{
        console.log(err)
        process.exit()
    })



const bootServer = () => {
    const app = express()

    app.get('/test', async (req,res)=>{
        const dataSample = {
            title : "hello",
            columnOrder : [],
        }
        let newBoard = await BoardModel.createNew(dataSample)
        console.log(newBoard);
        res.end('<h1>Hello TIzz</h1>')
    })
    
    app.listen(env.APP_PORT,env.APP_HOST, () => {
        console.log("hello duy thanh");
    })
}


