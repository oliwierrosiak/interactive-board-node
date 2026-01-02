import { User } from "../db/dbConfig.js"
import imgCompressor from "../sharp/imgCompressor.js"
import s3Upload from "../s3/s3Upload.js"
import tempCleaner from "../tempCleaners/boardMediaTempCleaner.js"

async function uploadImg(img)
{
    try
    {
        await s3Upload(img.path,`userImg/${img.filename}${img.extension}`,img.mimetype)
    }
    catch(ex)
    {}
}

async function registerUser(req,res)
{
    try
    {
        let link,img

        if(req.file)
        {
            img = await imgCompressor(req.file,'userImg')
            link = `https://interactive-board-storage.s3.eu-north-1.amazonaws.com/userImg/${img.filename}${img.extension}`
        }

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            img:link?link:''
        })

        await user.save()

        res.sendStatus(200)
        if(req.file)
        {
            await uploadImg(img)
            tempCleaner('userImgTemp','userImg')
        }
    }
    catch(ex)
    {
        const response = {
            status:400,
            ok:false,
            message:"400 Invalid request - You have provided wrong data or your sent data is not complete",
            errors:{
                name:'',
                email:'',
                password:'',
            }
        }

        for(const key in response.errors)
        {
            if(ex.errors?.[key]?.properties?.message)
            {
                response.errors[key] = ex.errors?.[key]?.properties?.message 

            }
            else
            {
                response.errors[key] = ''
            }
        }

        if(ex.code == 11000)
        {
            for(const key in ex.keyValue)
            {
                if(key === "name")
                {
                    response.errors.name = `Nazwa jest już zajęta`
                }
                if(key === "email")
                {
                    response.errors.email = `Ten email jest już zarejestrowany`
                }
            }
        }
        res.status(400).json(response)
        tempCleaner('userImgTemp','userImg')
    }
}

export default registerUser