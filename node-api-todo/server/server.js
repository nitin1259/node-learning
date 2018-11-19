
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ToDos} = require('./models/toDo');
const {User} = require('./models/user');

const app = express();


app.use(bodyParser.json());

app.post('/ToDos', (req, res) => {
    console.log(req.body.text);
    const todo = new ToDos({
        text: req.body.text
    });

    todo.save().then(result =>{
        res.status(200).send(result);
    }).catch(err =>{
        res.status(400).send(err);
    })
})


app.get('/ToDos/1234', (req, res) => {
    res.send([{
        text: 'Things to complete',
        completed: false
    }])
})


app.listen(3000, () => {
    console.log(`server started at port number: 3000`);
})