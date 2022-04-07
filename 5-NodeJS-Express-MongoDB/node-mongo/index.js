const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

//line 8 is connect to mongodb server, (err, client is a call back to access nucampsite database line 16 )
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');

    // interact with the Server through Database Operations
    //line below is nucampsite database 
    const db = client.db(dbname);
    // drop/delete  campsite collection in the database 
    db.dropCollection('campsites')
        .then(result => {
            console.log('Dropped Collection:', result);
        })
        .catch(err => console.log('No collection to drop.'));

    //collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" },
    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
        .then(result => {
            console.log('Insert Document:', result.ops);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                { description: "Updated Test Description" }, 'campsites');
        })
        .then(result => {
            console.log('Updated Document Count:', result.result.nModified);

            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);

            return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                'campsites');
        })
        .then(result => {
            console.log('Deleted Document Count:', result.deletedCount);

            return client.close();
        })
        .catch(err => {
            console.log(err);
            client.close();
        });
})
    .catch(err => console.log(err));
//handle error by the (err, null) call back function
// stop error by the assert.strictEqual(err, null) function 