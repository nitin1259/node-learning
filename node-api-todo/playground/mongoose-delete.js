const { ObjectID } = require('mongodb')
const { mongoose } = require('../server/db/mongoose');
const { ToDos } = require('../server/models/toDo');

const id = '5bf43c4da8d7bd4ba4e1581b';  // valid and exiting id


ToDos.remove({}).then(result =>{
    console.log(result);
})

ToDos.findOneAndDelete({ _id: id}).then(doc =>{
    console.log('deleted doc ', doc);
});


ToDos.findByIdAndDelete(id).then(doc =>{
    console.log('deleted doc by Id: ', doc);
});
