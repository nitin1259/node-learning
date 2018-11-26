const mongoose = require ('mongoose');
const validator = require('validator')
// const user = {
//     email: 'jaat.nitin19@gmail.com';
//     password: 'pass@123',
//     tokens:[{
//         access: 'auth',
//         token: 'xyzdsasdf;ladkfjalsdkfjaskld;fjasd;fjas;djfsakldfj'
//     }] 
// }

const User = mongoose.model('User', {
    email: {
        type: String,
        required : true,
        minlength : 1,
        trim: true,
        unique: true,
        validate : {
            validator: value => validator.isEmail(value),
            message:  props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[{
        access:{
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]
});

module.exports = {
    User
}