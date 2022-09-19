import { CardModel } from '*/models/card.model'


const createNew = async (data)=>{
    try{
        const result = await CardModel.createNew(data)
        const getCard = await CardModel.findOneById(result.insertedId.toString())
        return getCard
    } catch(err){
        throw new Error(err)
    }
}


export const CardService = { createNew }