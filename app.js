import './db/dbConfig.js'
import './server/startServer.js'

import { Notes } from './db/dbConfig.js'

const saveNotes = async() =>{
    const note = new Notes({
        code:'654321',
        title:'2'
    })
    await note.save()
}

// saveNotes()

