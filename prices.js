var DbConnection = require('./cryptoTextDb');

const PRICES_TABLE_NAME = 'prices';

async function insertPrice(price) {
    try {
        let db = await DbConnection.Get();
        let result = await db.collection(PRICES_TABLE_NAME).insertOne(price);

        console.log(`New price created with the following id:  ${result.insertedId}`);
    } catch (e) {
        console.log(e);
    }
}

async function findLastEnteredPriceByName(nameOfCoin){
    try {
        let db = await DbConnection.Get();
        let cursor = db.collection(PRICES_TABLE_NAME).find({
            name: nameOfCoin
        }).sort({dateAdded: -1})
        .limit(1);

        let result = await cursor.toArray();
        if (result){
            console.log(`Found last pricing listing in the collection with the name '${nameOfCoin}':`);
            console.log(result);
            return result;
        }
    } catch (e) {
        console.log(e);
    }
}

// Just using the below for testing
async function main() {
    // var price = {
    //     name: "BTC",
    //     price: 57411.52006252317,
    //     dateAdded: new Date().toISOString()
    // }
    // await insertPrice(price);

    await findLastEnteredPriceByName("BTC");
}

main();