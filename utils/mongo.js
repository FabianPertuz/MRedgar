
const { MongoClient } = require('mongodb');

let dbInstance; 
let client;

async function connectMongo(uri, dbName) {
  if (dbInstance) return dbInstance; 

  client = new MongoClient(uri);
  await client.connect();
  dbInstance = client.db(dbName);

  console.log(`MongoDB conectado a la base de datos: ${dbName}`);
  return dbInstance;
}


function getDb() {
  if (!dbInstance) {
    throw new Error('La base de datos no está inicializada. Llama a connectMongo primero.');
  }
  return dbInstance;
}


async function closeMongo() {
  if (client) {
    await client.close();
    dbInstance = null;
    console.log('Conexión a MongoDB cerrada.');
  }
}

module.exports = {
  connectMongo,
  getDb,
  closeMongo
};
