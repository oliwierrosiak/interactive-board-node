import express from 'express'
import postBoardImg from '../controllers/postBoardImg.js'
import boardImgUpload from '../middleware/uploadBoardImg.js'

const Router = new express.Router()

Router.post('/boardImg',boardImgUpload.single('img'),postBoardImg)

export default Router