const mongoose = require ('mongoose');

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
    },
    _creator:{
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});


module.exports = {
    ToDos
}