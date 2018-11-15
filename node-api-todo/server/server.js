
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/ToDoApp');

const ToDos = mongoose.model('ToDos', {
    text: { type: String },
    completed: { type: Boolean },
    completeAt: { type: Number }
});


const newTodo = new ToDos({
    text: 'Cook dinner'
});


newTodo.save().then(res => {
    console.log('create a todo collection document ', res);
}, err => {
    console.log('error while saving todos: ', err)
});


const anotherTodo = new ToDos({
    text: 'go to gym',
    completed: false,
    completeAt: 0
});


anotherTodo.save().then(res => {
    console.log('create a todo collection document ', res);
}).catch(err => {
    console.log('error while saving todos: ', err);
})