import { Notes } from "../db/dbConfig.js"

async function getBoardData(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        if(!note)
        {
            throw new Error()
        }

        res.status(200).json(note)
        
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default getBoardData