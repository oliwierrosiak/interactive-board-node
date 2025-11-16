import express from 'express'
import Router from '../routes/routes.js'
import cors from 'cors'

export const App = express()

App.use(express.json())

App.use(cors())

App.use(Router)