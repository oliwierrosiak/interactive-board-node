import { App } from "./serverConfig.js";
import dotenv from 'dotenv'
dotenv.config()

App.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})