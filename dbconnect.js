const mongoose = require("mongoose");

const DB_CONNECTION_STRING = "mongodb://localhost:27017/anonymouse-realtime-chat";

module.exports = () => {
    mongoose.connect(DB_CONNECTION_STRING, {
        useCreateIndex: true,
        useNewUrlParser: true,
        poolSize: 5,
        useUnifiedTopology: true
    })
        .then(db => console.log('Connected with MongoDB.'))
        .catch(err => console.log(`Unable to connect with MongoDB: ${err.message}`));
}
