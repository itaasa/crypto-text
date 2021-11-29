const { MongoClient } = require('mongodb');
const config = require('config');

async function main(){
    const uri = `mongodb+srv://${config.get('mongoUsername')}:${config.get('mongoPassword')}@${config.get('mongoClusterUrl')}.ctxtn.mongodb.net/crypto_text?retryWrites=true&w=majority`;
    
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Test queries here
        // await getAllEnabledUsers(client);
        // For the  ISO date, it is new Date().toISOString()
        await findLastEnteredPriceByName(client, "CRO");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createPrice(client, price){
    const result = await client.db("crypto_text").collection("prices").insertOne(price);
    console.log(`New price created with following id: " ${result.insertedId}`);
}

async function findLastEnteredPriceByName(client, nameOfCoin){
    const cursor = client.db("crypto_text").collection("prices").find(
        {
            name: nameOfCoin
        }
    ).sort({ dateAdded: -1 })
    .limit(1);

    const results = await cursor.toArray();

    if (results){

        var date = new Date(results.dateAdded);
        console.log(date.getFullYear());
        
        console.log(`Found last pricing listing in the collection with the name '${nameOfCoin}':`);
        console.log(results);
    }
}

main().catch(console.error);
