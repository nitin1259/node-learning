
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) return console.log('Not able to connect db: ', err);

    const db = client.db('TodoApp');

    // delete many
    // db.collection('ToDos').deleteMany({ text: 'have dinner' }).then(res => { console.log(res); });

    // delete one 
    // db.collection('ToDos').deleteOne({ text: 'have dinner' }).then(res => { console.log(res); });

    // find one and delete
    db.collection('ToDos').findOneAndDelete({text: 'having dinner'}).then(res => console.log(res));

    // client.close();
});
