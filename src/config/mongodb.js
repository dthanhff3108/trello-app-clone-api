import { MongoClient } from "mongodb";
import { env } from '*/config/environment.js'




const client = new MongoClient(env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
});

export const connectDB = async () => {
    try{
        await client.connect()
        console.log("connected succesfully");
        await listDatabase()
    } catch (err){
        console.log(err);
    } finally {
        // Close connection
        await client.close()
    }
}

export const listDatabase = async () => {
    const dataBases = await client.db().admin().listDatabases()
    console.log(dataBases.databases)
}
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });