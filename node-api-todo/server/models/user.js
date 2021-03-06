const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

const secretKey = process.env.SECRET_KEY;
// const user = {
//     email: 'jaat.nitin19@gmail.com';
//     password: 'pass@123',
//     tokens:[{
//         access: 'auth',
//         token: 'xyzdsasdf;ladkfjalsdkfjaskld;fjasd;fjas;djfsakldfj'
//     }] 
// }

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function () {
    const user = this;

    const userOjb = user.toObject();
    return _.pick(userOjb, ['_id', 'email']);
}

// instance method
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, secretKey).toString();

    // user.tokens = user.tokens.concat([{access, token}]);
    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    })
}

// model methodds
UserSchema.statics.getUserByToken = function (token) {
    const User = this;
    let decoded = '';

    try {
        decoded = jwt.verify(token, secretKey);
    } catch (error) {
        // return new Promise((resolve, reject)=>{
        //     reject();
        // });
        return Promise.reject('invalid token')
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access
    });
}

UserSchema.statics.findUserByCredentials = function (email, password) {
    const User = this;

    return User.findOne({ email }).then(user => {
        if (!user) {
            return Promise.reject('User not found');
        }

        return new Promise((resolve, reject) => {
            bcryptjs.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    reject(err)
                } else {
                    resolve(user);
                }
            })
        })
    })
}

UserSchema.methods.deleteToken = function (token) {
    const user = this;
    return user.update({
        $pull: {
            tokens: { token }
        }
    })
}

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        //encrypt the password only if there is password field changed or modified.
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(user.password, salt, (err, hashPass) => {
                user.password = hashPass;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema); // this is just refactoring of code not fucntionality...
/*
we are going to intoruduce instance method and model method here
model method -> is something like which is applicable to model function like find() or findById(). eg-> findUserByToken()
instance method -> are called on individual user,  we are doing something with the instance creating with the functionality. eg-> generateAuthToken() each user have unique token
*/

module.exports = {
    User
}