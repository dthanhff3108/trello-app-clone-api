import { BoardModel } from '*/models/board.model'
import { getDB } from '*/config/mongodb'
import { findOneById } from '*/models/board.model'
import { ObjectId } from 'mongodb'

const createNew = async (data)=>{
    try{
        const result = await BoardModel.createNew(data)
        const getBoard = await BoardModel.findOneById(result.insertedId.toString())
        return getBoard
    } catch(err){
        throw new Error(err)
    }
}

export const BoardService = { createNew }