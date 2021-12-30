const {MongoClient} = require("mongodb");
const mysql = require("mysql");

// module.exports = {
//     db: {},
//     async connect() {
//         try{
//             const client = await MongoClient.connect(process.env.MONGO_URL);
//             this.db = client.db(process.env.MONGO_DB);
//             console.log(this.db)
//         } catch(err) {
//             console.log(err)
//         }
//     }
// }

module.exports = {
    connection: null,
    async connect() {
        this.connection = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "admin123",
            database: "integra"
        })
    }
}