import mongoose from "mongoose";

const NotesModel = new mongoose.Schema({
    title:{
        type:String,
        default:'Nowy projekt'
    }
})

export default NotesModel