import Joi from 'joi'
import { getDB } from '*/config/mongodb'
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(1).max(20),
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
        return results.ops[0]
    }catch(err){
        console.log(err);
    }
}

export const BoardModel = { createNew }