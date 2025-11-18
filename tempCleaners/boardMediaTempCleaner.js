import fs from 'fs'

async function deleteFile(path,file) {
    try
    {
        await fs.promises.unlink(`${path}/${file}`)
    }
    catch(ex)
    {}
}

async function boardMediaTempCleaner()
{
    fs.readdir(`uploads/boardMediaTemp`,(err,files)=>{
        if(err)
        {
            return null
        }
        files.forEach(x=>deleteFile('uploads/boardMediaTemp',x))
    })
    fs.readdir('uploads/boardMedia',(err,files)=>{
        if(err)
        {
            return null
        }
        files.forEach(x=>deleteFile('uploads/boardMedia',x))
    })
}

export default boardMediaTempCleaner