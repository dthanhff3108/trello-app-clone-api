import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'


const createNew = async (data)=>{
    try{
        const newColumn = await ColumnModel.createNew(data)
        const getColumn = await ColumnModel.findOneById(newColumn.insertedId.toString())
        await BoardModel.pushColumnOrder(getColumn.boardId.toString(), getColumn._id.toString())
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