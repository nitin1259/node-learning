const {User} = require('./../models/user');

const authMiddleware = (req, res, next) =>{
    var token = req.header('x-auth');

    User.getUserByToken(token).then(user=>{
        if(!user){
            Promise.reject('user not found')
        }
        // res.send(user);
        req.user = user;
        req.token = token;
        next();
    }).catch(err=>{
        res.status(401).send(err);
    })
}

module.exports = {
    authMiddleware
}