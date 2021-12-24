const {MongoClient} = require("mongodb");

module.exports = {
    db: {},
    async connect() {
        try{
            const client = await MongoClient.connect(process.env.MONGO_URL);
            this.db = client.db(process.env.MONGO_DB);
        } catch(err) {
            console.log(err)
        }
    }
}