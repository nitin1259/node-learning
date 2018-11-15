
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) return console.log('Connection refuse with error: ' + err);

    db = client.db('TodoApp');

    db.collection('ToDos').findOneAndUpdate(
        {
            _id: new ObjectID('5be9c56b5a04fe24dc15aab6')
        },
        {
            $set: { completed: true }
        },
        {
            returnOriginal: false
        }
    ).then(res => {
        console.log(JSON.stringify(res, undefined, 2));
    });



    db.collection('User').findOneAndUpdate(
        {
            _id: new ObjectID('5be9e02b18c2eb200437cd38')
        },
        {
            $set: { name: 'Sachinder Singh Tomer' },
            $inc: { age: 1 }
        },
        {
            returnOriginal : true
        }
    ).then(res =>{
        console.log(JSON.stringify(res, undefined, 2));
    })




    client.close();
});
