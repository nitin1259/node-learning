console.log("Starting application...");

var fs = require('fs');  // inbuilt module
const os = require('os'); // inbuilt module  
const _ = require('lodash'); // third party module
const note = require('./notes'); // local file module.


const user  = os.userInfo();

console.log(_.random(5));
console.log(_.isString(true));
console.log(_.isString('true'));
console.log(_.uniq(['Nitin', 1, 2, 'Nitin', 2, 4]));

console.log(note.doFun());
console.log(note.addSum(4,'-6'));



// fs.appendFileSync('greeting.txt', `Hello ${user.username} to Node World... My age is ${note.age}`)