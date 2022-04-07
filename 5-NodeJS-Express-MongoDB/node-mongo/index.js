const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

//line 8 is connect to mongodb server, (err, client is a call back to access nucampsite database line 16 )
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    // interact with the Server through Database Operations
    //line below is nucampsite database 
    const db = client.db(dbname);
    // drop/delete  campsite collection in the database 
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //recreate new campsites collection, inserted new document Breadcrumb to the campsite collection 
        const collection = db.collection('campsites');

        collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" },
            (err, result) => {
                assert.strictEqual(err, null);
                console.log('Insert Document:', result.ops);

                //collection.find help console.log all the document from the campsite collection 
                collection.find().toArray((err, docs) => {
                    assert.strictEqual(err, null);
                    console.log('Found Documents:', docs);
                    // close the client 
                    client.close();
                });
            });
    });
});
//handle error by the (err, null) call back function 
// stop error by the assert.strictEqual(err, null) function 