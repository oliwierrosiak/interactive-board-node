import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { RefreshToken } from '../db/dbConfig.js'
dotenv.config()

async function refreshToken(req,res)
{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken)
    {
        res.sendStatus(403)
    }

    try
    {
        const dbToken = await RefreshToken.findOne({token:refreshToken})
        if(!dbToken || dbToken.expiresIn < new Date().getTime())
        {
            throw new Error()
        }

        jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,data)=>{
        if(err)
        {
            res.sendStatus(403)
        }

        const payload = {
            email:data.email
        }

        const newToken = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'30s'})
        res.status(200).json({token:newToken})
    })

    }
    catch(ex)
    {
        res.sendStatus(401)
    }

    

}

export default refreshToken