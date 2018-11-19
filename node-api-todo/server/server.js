
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/ToDoApp');

const ToDos = mongoose.model('ToDos', {
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completeAt: {
        type: Number,
        default: null
    }
});


// const newTodo = new ToDos({
//     text: 'Cook dinner'
// });


// newTodo.save().then(res => {
//     console.log('create a todo collection document ', res);
// }, err => {
//     console.log('error while saving todos: ', err)
// });


// const anotherTodo = new ToDos({
//     text: 'go to gym',
//     completed: false,
//     completeAt: 0
// });


// anotherTodo.save().then(res => {
//     console.log('create a todo collection document ', res);
// }).catch(err => {
//     console.log('error while saving todos: ', err);
// })

/*
const todo1 = new ToDos({
    text: 'Something has to do'
});

todo1.save().then(res => {
    console.log('create a todo collection document ', res);
}).catch(err => {
    console.log('error while saving todos: ', err);
})

*/

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
})


const user1 = new User({
    email  : 'jaat.nitin19@gmail.com'
})


user1.save().then(res => {
    console.log('create a todo collection document ', res);
}).catch(err => {
    console.log('error while saving todos: ', err);
})