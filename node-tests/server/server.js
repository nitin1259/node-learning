const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send("Hello world !");
});

app.get('/test1', (req, res)=>{
    res.status(404).send("Testing one !");
});


app.get('/test2', (req, res)=>{
    res.status(404).send({
        error: 'page not found'
    });
});


app.get('/test3', (req, res)=>{
    res.status(404).send({
        error: 'page not found',
        name: 'Todo app v1.0'
    });
});

app.get('/users', (req, res)=>{
    res.status(200).send([
        {
            name: 'Sachin',
            age: 28
        },
        {
            name: 'Nitin',
            age: 30
        },
        {
            name: 'Kapil',
            age: 22
        }
    ])
})

app.listen(3000);

module.exports.app = app;