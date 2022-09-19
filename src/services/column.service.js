import { ColumnModel } from '*/models/column.model'


const createNew = async (data)=>{
    try{
        const result = await ColumnModel.createNew(data)
        const getColumn = await ColumnModel.findOneById(result.insertedId.toString())
        return getColumn
    } catch(err){
        throw new Error(err)
    }
}

const update = async (id,data) => {
    try{
        const updateColumn = {
            ...data,
            updatedAt : Date.now()
        }
        const result = await ColumnModel.update(id, updateColumn)
        return result
    }catch(err){
        throw new Error(err)
    }
}

export const ColumnService = { createNew, update }