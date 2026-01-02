import { RefreshToken } from "../db/dbConfig.js"

async function deleteRefreshToken(refreshToken) {
    try
    {
        await RefreshToken.deleteOne({token:refreshToken})
    }
    catch(ex)
    {
        console.log(ex)
    }
}

export default deleteRefreshToken