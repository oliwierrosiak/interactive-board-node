import './db/dbConfig.js'
import './server/startServer.js'
import { Notes } from './db/dbConfig.js'

async function test()
{
    try
    {
        const test = new Notes({title:'test'})
        await test.save()
    }
    catch(ex)
    {
        console.log(ex)
    }
}

// test()
