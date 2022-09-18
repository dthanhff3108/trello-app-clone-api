import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder : Joi.array().items(Joi.string()).default([]),
    createdAt : Joi.date().timestamp().default(Date.now()),
    updatedAt : Joi.date().timestamp().default(null).$,
    _destroy : Joi.boolean().default(false)
})

const validateSchema = async (data)=>{
    return await boardCollectionSchema.validateAsync(data,{abortEarly:false})
}
const createNew = async (data)=>{
    try{
        const value = await validateSchema(data)
        const results =  await getDB().collection(boardCollectionName).insertOne(value)
        return results
    }catch(err){
        console.log("create");
        throw new Error(err)
    }
}

const findOneById = async (id) => {
    try{
        const data = await getDB().collection(boardCollectionName).findOne({ _id:ObjectId(id)})
        return data
    }catch(err){
        console.log("find");
        throw new Error(err)
    }
}



export const BoardModel = { createNew, findOneById }