var DbConnection = require('./cryptoTextDb');

const USERS_TABLE_NAME = 'users';

function User(firstName, lastName, phoneNumber, isEnabled) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.isEnabled = isEnabled;
}

async function insertUser(user) {
    try {
        let db = await DbConnection.Get();
        let result = await db.collection(USERS_TABLE_NAME).insertOne(user);
        
        console.log(`New user created with the following id: ${result.insertedId}`);
    } catch (e) {
        console.log(e);
    }
}

async function getAllEnabledUsers() {
    try {
        let db = await DbConnection.Get();
        let cursor = db.collection(USERS_TABLE_NAME).find(
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

async function getAllEnabledPhoneNumbers() {
    var enabledUsers = await getAllEnabledUsers();
    var phoneNumbers = [];

    enabledUsers.forEach(element => {
        phoneNumbers.push(element.phoneNumber);
    });

    return phoneNumbers;
}

// Just using the below for testing
async function main() {
}

main();