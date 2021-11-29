const { MongoClient } = require('mongodb');
const config = require('config');

const DATABASE_NAME = 'crypto_text';
const URL = `mongodb+srv://${config.get('mongoUsername')}:${config.get('mongoPassword')}@${config.get('mongoClusterUrl')}.ctxtn.mongodb.net/crypto_text?retryWrites=true&w=majority`;

var DbConnection = function() {
    var db = null;
    var instance = 0;

    async function DbConnect(){
        try {
            let _db = await MongoClient.connect(URL);
            
            return _db.db(DATABASE_NAME);
        } catch (e) {
            return e;
        }
    }

    async function Get() {
        try {
            instance++;
            console.log(`DBConnection called ${instance} times`);

            if (db != null){
                console.log(`db connection is already established.`);
                return db;
            } else {
                db = await DbConnect();
                console.log(`creating new db connection`)
                return db;
            }
        } catch (e) {
            return e;
        }
    }

    return {
        Get: Get
    }
}

module.exports = DbConnection();