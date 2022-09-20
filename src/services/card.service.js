import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async (data)=>{
    try{
        const result = await CardModel.createNew(data)
        const getCard = await CardModel.findOneById(result.insertedId.toString())
        await ColumnModel.pushCardOrder(getCard.columnId.toString(),getCard._id.toString())
        return getCard
    } catch(err){
        throw new Error(err)
    }
}


export const CardService = { createNew }