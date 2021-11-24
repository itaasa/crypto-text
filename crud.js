const { MongoClient } = require('mongodb');
const config = require('config');

async function main(){
    const uri = `mongodb+srv://${config.get('mongoUsername')}:${config.get('mongoPassword')}@${config.get('mongoClusterUrl')}.ctxtn.mongodb.net/crypto_text?retryWrites=true&w=majority`;
    
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        //Test queries here
        await getAllEnabledUsers(client);
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
        console.log(`Found last pricing listing in the collection with the name '${nameOfCoin}':`);
        console.log(results);
    }
}

async function getAllEnabledUsers(client){
    const cursor = client.db("crypto_text").collection("users").find(
        {
            is_enabled: true
        }
    );

    const results = await cursor.toArray();

    if (results){
        console.log('Found the following enabled users: ');
        console.log(results);

        getAllEnabledPhoneNumbers(results);
        return results;
    }
}

function getAllEnabledPhoneNumbers(users){
    var phoneNumbers = [];
    users.forEach(element => {
        phoneNumbers.push(element.phone_number);
    });

    console.log(phoneNumbers);
}

main().catch(console.error);
