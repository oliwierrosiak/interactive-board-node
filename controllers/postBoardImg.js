import s3Upload from "../s3/s3Upload.js"
import imgCompressor from "../sharp/imgCompressor.js"

async function postBoardImg(req,res)
{
    try
    {
        const img = await imgCompressor(req.file)
        await s3Upload(img.path,`boardImg/${img.filename}${img.extension}`,img.mimetype)
        const link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/boardImg/${img.filename}${img.extension}`
        res.status(200).json({link})
    }
    catch(ex)
    {
        res.sendStatus(500)
    }
}

export default postBoardImg