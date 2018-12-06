require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { ToDos } = require('./models/toDo');
const { User } = require('./models/user');
const { ObjectID } = require('mongodb');
const { authMiddleware } = require('./middleware/authenticate');

const app = express();


app.use(bodyParser.json());

// POST /todos
app.post('/todos', authMiddleware, (req, res) => {
    console.log(req.body.text);
    const todo = new ToDos({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err);
    })
})

// Get all /todos
app.get('/todos', authMiddleware, (req, res) => {
    ToDos.find({
        _creator: req.user._id
    }).then(todos => {
        res.status(200).send({
            todos
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

// GET /todos/123
app.get('/todos/:todoId', authMiddleware, (req, res) => {
    const id = req.params.todoId;
    // checking id is valid object id or not
    if (!ObjectID.isValid(id))
        res.status(404).send({ msg: 'Not a valid id' });
    else {
        ToDos.findOne({
            _id: id,
            _creator: req.user._id
        }).then(todo => {
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
app.delete('/todos/:todoId', authMiddleware, (req, res) => {
    const id = req.params.todoId;

    if (!ObjectID.isValid(id)) {
        res.status(403).send({ msg: 'Id is not valid' })
    } else {
        ToDos.findOneAndDelete({ _id: id, _creator: req.user._id }).then(todo => {
            if (!todo) {
                res.status(404).send({ msg: 'Id not found' })
            }
            res.status(200).send({ todo });
        }).catch(err => {
            res.status(400).send(err);
        });
    }
});

// PATCH /todos/:id
app.patch('/todos/:todoId', authMiddleware, (req, res) => {
    const id = req.params.todoId;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        res.status(404).send({ msg: 'Id is not valid' })
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completeAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completeAt = null;
    }

    ToDos.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then(todo => {
        if (!todo) {
            res.status(404).send({ msg: 'todo not found' })
        }
        res.status(200).send({ todo });
    }).catch(err => {
        res.status(400).send(err);
    });
});

// POST Users
app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.status(200).header('x-auth', token).send(user);
    }).catch(err => {
        res.status(400).send(err);
    })
});

// this should be in seperate file 
// const authMiddleware = (req, res, next) =>{
//     var token = req.header('x-auth');

//     User.getUserByToken(token).then(user=>{
//         if(!user){
//             Promise.reject('user not found')
//         }
//         // res.send(user);
//         req.user = user;
//         req.token = token;
//         next();
//     }).catch(err=>{
//         res.status(401).send(err);
//     })
// }

// GET Users/me
app.get('/users/me', authMiddleware, (req, res) => {
    res.send(req.user);
})

// Post /users/login {email, password}

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findUserByCredentials(body.email, body.password).then(user => {
        // res.send(user);
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user);
        });
    }).catch(err => {
        res.status(401).send(err);
    });
});

// Logging Out - DELETE /users/me/token
app.delete('/users/me/token', authMiddleware, (req, res) => {
    const user = req.user;
    const token = req.token;

    user.deleteToken(token).then(() => {
        res.send('successfully logout')
    }, () => {
        res.status(400).send('error while logging out!!!');
    });
});

app.listen(3000, () => {
    console.log(`server started at port number: 3000`);
})

module.exports = { app }