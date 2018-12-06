const { ObjectID } = require('mongodb');
const jwt  = require('jsonwebtoken');

const { ToDos } = require('./../../models/toDo');
const { User } = require('./../../models/user');

const secretKey = 'Pass@123';

// for users
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'nitin.singh@ca.com',
        password: 'UserOnePass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId, access: 'auth' }, secretKey).toString()
            }
        ]
    },
    {
        _id: userTwoId,
        email: 'sachin.chahal@ca.com',
        password: 'UserTwoPass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userTwoId, access: 'auth' }, secretKey).toString()
            }
        ]
    }
];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo])
    }).then(() => {
        done();
    })
}

// for todos
const todos = [{
    _id: new ObjectID(),
    text: 'first test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completeAt: 123,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    ToDos.deleteMany({}).then(() => {
        return ToDos.insertMany(todos)
    }).then(() => {
        done();
    })
}
module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}