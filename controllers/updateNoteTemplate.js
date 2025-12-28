import { Notes } from "../db/dbConfig.js"

async function updateNoteTemplate(req,res)
{
    try
    {
        const note = await Notes.findOne({_id:req.params.id})
        if(note && note.template != req.body.template)
        {
            note.template = req.body.template
            await note.save()
        }
        res.sendStatus(200)
        
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default updateNoteTemplate