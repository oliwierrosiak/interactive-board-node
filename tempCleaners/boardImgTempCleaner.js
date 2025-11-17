import fs from 'fs'

async function deleteFile(file) {
    try
    {
        await fs.promises.unlink(`uploads/boardImgTemp/${file}`)
    }
    catch(ex)
    {}
}

async function boardImgTempCleaner()
{
    fs.readdir(`uploads/boardImgTemp`,(err,files)=>{
        if(err)
        {
            return null
        }
        files.forEach(x=>deleteFile(x))
    })
}

export default boardImgTempCleaner