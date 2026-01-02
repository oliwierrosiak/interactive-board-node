import deleteRefreshToken from "./deleteRefreshToken.js"

function logout(req,res)
{
    deleteRefreshToken(req.cookies.refreshToken)

    res.cookie("refreshToken", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
    res.sendStatus(200)
}

export default logout