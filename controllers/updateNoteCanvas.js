import { Notes } from "../db/dbConfig.js"

async function updateNoteCanvas(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        if(!note)
        {
            throw new Error()
        }

        const noteContent = [...note.content]
        const canvasIndex = note.content.findIndex(x=>x.id === req.body.canvas.id)
        if(canvasIndex != -1)
        {
            noteContent.splice(canvasIndex,1)
            noteContent.push(req.body.canvas)
            note.content = noteContent
            await note.save()
        }
        else
        {
            noteContent.push(req.body.canvas)
            note.content = noteContent
            await note.save()
        }
        res.sendStatus(200)
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateNoteCanvas