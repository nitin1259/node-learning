
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { ToDos } = require('./models/toDo');
const { User } = require('./models/user');
const { ObjectID } = require('mongodb');

const app = express();


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body.text);
    const todo = new ToDos({
        text: req.body.text
    });

    todo.save().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err);
    })
})


app.get('/todos', (req, res) => {
    ToDos.find().then(todos => {
        res.status(200).send({
            todos
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

// GET /todos/123
app.get('/todos/:todoId', (req, res) => {
    const id = req.params.todoId;
    // checking id is valid object id or not
    if (!ObjectID.isValid(id))
        res.status(404).send({ msg: 'Not a valid id' });
    else {
        ToDos.findById(id).then(todo => {
            if (!todo) { //check id is not present in db
                res.status(404).send({ msg: 'document not available with id: ' + id });
            } else {
                res.status(200).send({ todo });
            }
        }).catch(err => {
            res.status(400).send(err);
        })
    }
});

// DELETE /todos:id
app.delete('/todos/:todoId', (req, res) => {
    const id = req.params.todoId;

    if (!ObjectID.isValid(id)) {
        res.status(403).send({ msg: 'Id is not valid' })
    } else {
        ToDos.findByIdAndDelete(id).then(todo =>{
            if(!todo){
                res.status(404).send({msg: 'Id not found'})
            }
            res.status(200).send({todo});
        }).catch(err =>{
            res.status(400).send(err);
        });
    }
});

app.listen(3000, () => {
    console.log(`server started at port number: 3000`);
})

module.exports = { app }