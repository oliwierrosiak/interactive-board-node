import { User } from "../db/dbConfig.js"

async function updateUserName(req,res)
{
    try
    {
        const user = await User.findOne({email:req.user})
        
        user.name = req.body.name

        await user.save()

        res.sendStatus(200)
    }
    catch(ex)
    {
        const response = {
            status:400,
            ok:false,
            message:"name already exist",
            errors:{
                name:''
            }
        }

        if(ex.errors?.name?.properties?.message)
        {
            response.errors.name = ex.errors?.name?.properties?.message 
        }
        else
        {
            response.errors.name = ''
        }
        if(ex.code == 11000)
        {
            response.errors.name = `Nazwa jest już zajęta`
        }
        res.status(400).json(response)
    }
}

export default updateUserName