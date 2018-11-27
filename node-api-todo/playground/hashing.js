const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

/* This is for the hashing 
 
const message = 'I am number 2';

const hashMsg = SHA256(message).toString();

console.log(`message : ${message}`);
console.log(`hashMsg : ${hashMsg}`);

const data ={
    id: 4
};

const token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'secretkey').toString()
};

// token.data =5;
const resultHash = SHA256(JSON.stringify(token.data) + 'secretkey').toString();

if(resultHash === token.hash){
    console.log('Same hash code can be trustable');
}else{
    console.log('token and result are not same. Do not trust.')
}

*/

////////////////////////////////////////////////////////////////////////////
// jwt token - npm install jsonwebtoken

const secretkey = 'Password@123'

var data ={
    id: 10
}

const jwtToken = jwt.sign(data, secretkey);
console.log('jwtToken: ', jwtToken);

const decodeJwt = jwt.verify(jwtToken, secretkey);
console.log('decodeJwt: ', decodeJwt);