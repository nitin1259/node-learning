
const MongoClient  = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err) return  console.log("COnnection refused: ", err);

    console.log('Connection succesful');

    const db = client.db('TodoApp');

    db.collection('User').insertOne({
        name: 'Vipin',
        age: 28,
        lcoation: 'Moradabad',
        isActive: true
    }, (err, results)=>{
        if(err) return  console.log("Error creating documents: ", err);

        console.log('Successfully created: ', JSON.stringify(results.ops, undefined, 2));
    })

    client.close();
});