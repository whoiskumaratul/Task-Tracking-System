const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);
const dbName = 'tts';

async function dbConnect()
{
    //handle promises
    let result = await client.connect();
    let db = result.db(dbName);
    console.log('Connected to database', db.databaseName);
    // return db.collection("timesheets")
    //  let collection = db.collection('timesheets');
    //  let response = await collection.find({}).toArray();
    //  console.log(response)
}

dbConnect();

