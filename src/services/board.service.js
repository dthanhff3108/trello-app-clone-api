import { BoardModel } from '*/models/board.model'

const createNew = async (data)=>{
    try{
        const result = await BoardModel.createNew(data)
        const getBoard = await BoardModel.findOneById(result.insertedId.toString())
        return getBoard
    } catch(err){
        throw new Error(err)
    }
}

const getFullBoard = async (id)=>{
    try{
        const board = await BoardModel.getFullBoard(id)
        board.columns.forEach(column=>{
            column.cards = board.cards.filter(card=>card.columnId.toString() === column._id.toString())
        })
        delete board.cards
        return board
    } catch(err){
        throw new Error(err)
    }
}
export const BoardService = { createNew, getFullBoard }