
// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID } = require('mongodb'); // example of destructuring from ES6 features

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err) return console.log("Not able to connect to mongodb", err);

    console.log('Connected to mongodb localhost');
    const db = client.db('TodoApp');

    // db.collection('ToDos').find().toArray().then(doc =>{
    //     console.log('Todos things');
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }).catch(err =>{
    //     console.log('error in finding data: ', err)
    // })

    // db.collection('ToDos').find({completed: true}).toArray().then(doc =>{
    //     console.log('Todos things');
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }).catch(err =>{
    //     console.log('error in finding data: ', err)
    // })


    // db.collection('ToDos').find({_id : new ObjectID('5be9c56b5a04fe24dc15aab6')}).toArray().then(doc =>{
    //     console.log('Todos things');
    //     console.log(JSON.stringify(doc, undefined, 2));
    // }).catch(err =>{
    //     console.log('error in finding data: ', err)
    // })

    db.collection('User').find({name: 'Nitin'}).toArray().then(doc =>{
        console.log('Todos things');
        console.log(JSON.stringify(doc, undefined, 2));
    }).catch(err =>{
        console.log('error in finding data: ', err)
    })


    db.collection('User').find({name: { '$ne' : 'Nitin'}}).toArray().then(doc =>{
        console.log('Todos things');
        console.log(JSON.stringify(doc, undefined, 2));
    }).catch(err =>{
        console.log('error in finding data: ', err)
    })

    // client.close();
});