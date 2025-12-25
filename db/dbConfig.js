import mongoose from "mongoose";
import dotenv from 'dotenv'
import NotesModel from "./models/notesModel.js";
dotenv.config()

export const Notes = mongoose.model('note',NotesModel)

mongoose.connect(process.env.DATABASE)
