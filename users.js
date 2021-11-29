var DbConnection = require('./cryptoTextDb');

async function getAllEnabledUsers() {
    try {
        let db = await DbConnection.Get();
        console.log(db);
        let cursor = db.collection('users').find(
            {
                isEnabled: true
            }
        )

        const results = await cursor.toArray();
        if (results) {
            console.log('Found the following enabled users: ');
            console.log(results);
            return results;
        }
    } catch (e) {
        console.log(e);
    }
}

// Just using the below for testing
async function main() {
    var myUsers = getAllEnabledUsers();
}

main();