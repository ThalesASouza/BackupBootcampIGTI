
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:1234@cluster0-ycbto.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async(err) => {
  const collection = client.db("grades").collection("student");
  const document = await collection.find().toArray();
  console.log(document);
  const databaselist = await client.db().admin().listDatabases();
  console.log('Databases:');
  databaselist.databases.forEach((db)=>{
    console.log(` - ${db.name}`)
  })
  client.close();
});
