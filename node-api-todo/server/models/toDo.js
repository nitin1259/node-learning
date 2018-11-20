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
        default: 123
    }
});


module.exports = {
    ToDos
}