import { ResetPassword } from "../db/dbConfig.js"

async function clearExpiredResetPasswordTokens()
{
    try
    {
        await ResetPassword.deleteMany({expireDate:{$lt:new Date().getTime()}})
    }
    catch(ex)
    {
    }
}

export default clearExpiredResetPasswordTokens