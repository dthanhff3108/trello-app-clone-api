import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId : Joi.string().required(),
    columnId : Joi.string().required(),
    title: Joi.string().required().min(1).max(20),
    cover : Joi.string().default(null),
    createdAt : Joi.date().timestamp().default(Date.now()),
    updatedAt : Joi.date().timestamp().default(null),
    _destroy : Joi.boolean().default(false)
})

const validateSchema = async (data)=>{
    return await cardCollectionSchema.validateAsync(data,{abortEarly:false})
}

const createNew = async (data)=>{
    try{
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId : ObjectId(validatedValue.boardId),
            columnId : ObjectId(validatedValue.columnId)
        }
        const results =  await getDB().collection(cardCollectionName).insertOne(insertValue)
        return results
    }catch(err){
        throw new Error(err)
    }
}

const findOneById = async (id) => {
    try{
        const data = await getDB().collection(cardCollectionName).findOne({ _id:ObjectId(id)})
        return data
    }catch(err){
        throw new Error(err)
    }
}

export const CardModel = { createNew, findOneById }