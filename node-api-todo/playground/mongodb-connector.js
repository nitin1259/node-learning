
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err) return console.log("Not able to connect to mongodb", err);

    console.log('Connected to mongodb localhost');
    const db = client.db('TodoApp');

    db.collection('ToDos').insertOne(
        {
          text: 'Something to do',
          completed: false  
        }, (err, result)=>{
            if(err) return console.log("Not able to update the collection", err)

            console.log('succesully update the collection with document: ')
            console.log(JSON.stringify(result.ops, undefined, 2));
    })

    client.close();
});