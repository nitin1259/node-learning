const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose');
const { ToDos } = require('./../server/models/toDo');

// const id = '5bf43c4da8d7bd4ba4e1581b';  // valid and exiting id

// ToDos.find({
//     _id: id
// }).then(todos =>{
//     console.log('todos : ', todos)
// });


// ToDos.findOne({
//     _id : id
// }).then(todo =>{
//     console.log('todo : ', todo);
// });

// ToDos.findById(id).then(todo =>{
//     console.log('todo by id: ', todo);
// });

// another example---------------------------------------------------------------------
// const id = '6bf43c4da8d7bd4ba4e1581b' // valid and non existing id

// ToDos.findById(id).then(todo => {
//     if (!todo)
//         console.log('todo id does not exist');
//     else
//         console.log('todo by id: ', todo);
// });


// another example for invalid id with exception handling----------------------------
// const id = '5bf43c4da8d7bd4ba4e1581b__' // invalid id

// ToDos.findById(id).then(todo => {
//     if (!todo)
//         console.log('todo id does not exist');
//     else
//         console.log('todo by id: ', todo);
// }).catch(err => {
//     console.log('INvalid id: ' + err);
// });


// another example Validating Id with ObjectID --------------------------
const id = '5bf43c4da8d7bd4ba4e1581b__' // invalid id
// const id2 = '5bf43c4da8d7bd4ba4e1581b' // valid id
const isValidId = ObjectID.isValid(id)

if (isValidId) {
    ToDos.findById(id).then(todo => {
        if (!todo)
            console.log('todo id does not exist');
        else
            console.log('todo by id: ', todo);
    }).catch(err => {
        console.log('INvalid id: ' + err);
    });
}else{
    console.log(`Not a valid id:  ${id}`);
}