import { ResetPassword, User } from "../db/dbConfig.js"

const deleteResetPasswordToken = async(id)=>
{
    try
    {
        await ResetPassword.deleteOne({_id:id})
    }
    catch(ex)
    {
    }
}

async function resetUserPassword(req,res)
{
    try
    {
        const resetPassword = await ResetPassword.findOne({_id:req.params.id})
        if(!resetPassword)
        {
            throw new Error()
        }
        if(resetPassword.expireDate < new Date().getTime())
        {
            const error = new Error('forbidden')
            error.status = 403
            throw error
        }
        const user = await User.findOne({email:resetPassword.email})
        user.password = req.body.newPassword
        await user.save()
        res.sendStatus(200)
        deleteResetPasswordToken(resetPassword._id)
    }
    catch(ex)
    {
        if(ex.errors?.password?.properties?.message)
        {
           res.status(401).json(ex.errors.password.properties.message)
        }
        else if(ex.status === 403)
        {
            res.sendStatus(403)
        }
        else
        {
            res.sendStatus(500)

        }
    }
}

export default resetUserPassword