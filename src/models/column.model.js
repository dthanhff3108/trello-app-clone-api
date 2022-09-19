import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId : Joi.string().required(),
    title: Joi.string().required().min(1).max(20).trim(),
    cardOrder : Joi.array().items(Joi.string()).default([]),
    createdAt : Joi.date().timestamp().default(Date.now()),
    updatedAt : Joi.date().timestamp().default(null),
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
        throw new Error(err)
    }
}

const update = async (id,data)=>{
    try{
        const results =  await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id : ObjectId(id)},
            { $set  :data},
            { returnDocument : "after" }
        )
        return results 
    }catch(err){
        throw new Error(err)
    }
}

const findOneById = async (id) => {
    try{
        const data = await getDB().collection(columnCollectionName).findOne({ _id:ObjectId(id)})
        return data
    }catch(err){
        throw new Error(err)
    }
}

export const ColumnModel = { createNew, findOneById, update }