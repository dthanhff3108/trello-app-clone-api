import Joi from 'joi'
import { getDB } from '*/config/mongodb'
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boarId : Joi.string().required(),
    title: Joi.string().required().min(1).max(20),
    cardOrder : Joi.array().items(Joi.string()).default([]),
    createdAt : Joi.date().timestamp().default(Date.now()),
    updatedAt : Joi.date().timestamp().default(null).$,
    _destroy : Joi.boolean().default(false)
})

const validateSchema = async (data)=>{
    return await columnCollectionSchema.validateAsync(data,{abortEarly:false})
}

const createNew = async (data)=>{
    try{
        const value = await validateSchema(data)
        const results =  await getDB().collection(columnCollectionName).insertOne(value)
        return results
    }catch(err){
        console.log(err);
    }
}

export const ColumnModel = { createNew }