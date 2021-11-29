var DbConnection = require('./cryptoTextDb');

async function getAllEnabledUsers() {
    try {
        let db = await DbConnection.Get();
        let cursor = db.collection('users').find(
            {
                isEnabled: true
            }
        )

        const results = await cursor.toArray();
        if (results) {
            return results;
        }
    } catch (e) {
        console.log(e);
    }
}

async function getAllEnabledPhoneNumbers(){
    var enabledUsers = await getAllEnabledUsers();
    var phoneNumbers = [];
    
    enabledUsers.forEach(element => {
        phoneNumbers.push(element.phoneNumber);
    });
    
    return phoneNumbers;
}

// Just using the below for testing
async function main() {
    var enabledPhoneNumbers = await getAllEnabledPhoneNumbers();
    console.log(enabledPhoneNumbers);
}

main();