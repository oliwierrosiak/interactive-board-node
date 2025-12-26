import { Notes } from "../db/dbConfig.js"
import dotenv from 'dotenv'
import s3Delete from "../s3/s3Delete.js"
dotenv.config()

async function deleteFromAWS(link)
{
    const key = link.split(`${process.env.AWS_ADDRESS}/`)[1]
    try
    {
        await s3Delete(key)
    }
    catch(ex)
    {
    }
}

async function deleteBoardItem(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.boardId})
        if(!note)
        {
            throw new Error()
        }
        const elements = [...note.content]
        const index = elements.findIndex(x=>x.id === req.params.elementId)
        if(index === -1)
        {
            throw new Error()
        }
        if(elements[index].type === 'img' && elements[index].link.includes('https://interactive-board-storage.s3'))
        {
            deleteFromAWS(elements[index].link)
        }
        elements.splice(index,1)
        note.content = elements
        await note.save()

        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}   

export default deleteBoardItem