import { MongoClient } from "mongodb";
import { env } from '*/config/environment.js'

const client = new MongoClient(env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
});

let dbInstance =null;
export const connectDB = async () => {
    await client.connect()
    dbInstance = client.db(env.DATABASE_NAME)
}

export const getDB = () => {
    if(!dbInstance) throw new Error('Must connect Mongo first')
    return dbInstance
}

