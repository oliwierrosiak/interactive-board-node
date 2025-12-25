import express from 'express'
import postBoardImg from '../controllers/postBoardImg.js'
import boardMediaUpload from '../middleware/uploadBoardMedia.js'
import getBoardData from '../controllers/getBoardData.js'
import updateBoard from '../controllers/updateBoard.js'

const Router = new express.Router()

Router.post('/boardImg',boardMediaUpload.single('img'),postBoardImg)

Router.get('/getBoardData/:id',getBoardData)

Router.post('/updateBoard/:id',updateBoard)

export default Router