
//4 parameter(db, document, collection ), coll short for collection 
exports.insertDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.insertOne(document); //(err, result) => {assert.strictEqual(err, null); callback(result); this whole thing is a call back if delete this call back insertOne will return a promise
};

exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};