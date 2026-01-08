import { Notes } from "../db/dbConfig.js"

async function createNote(req,res)
{
    try
    {
        let newCodeGenerated = false
        let code

        while(!newCodeGenerated)
        {
            code = Math.floor(100000 + Math.random() * 900000)
            const note = await Notes.findOne({code:code})
            if(!note)
            {
                newCodeGenerated = true
            }
        }

        const newNote = new Notes({
            title:req.body.title||'Nowy projekt',
            notePassword:req.body.password,
            admin:req.body.admin,
            code,
            visibility:req.body.visibility
        })

        const saved = await newNote.save()
        res.status(200).json({code,id:saved.id})
    }
    catch(ex)
    {
        console.log(ex)
        res.sendStatus(500)
    }
}

export default createNote