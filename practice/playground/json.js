// convert object into json string
/*
var obj = {
    name: 'Nitin',
    dob : '19-06-1989',
    salary: 50000
}

var objString  = JSON.stringify(obj);

console.log(typeof objString);
console.log(objString); // {"name":"Nitin","dob":"19-06-1989","salary":50000}

*/


// convert json string into object

/*
var personString = '{"name":"Nitin","dob":"19-06-1989","salary":50000}';
var person = JSON.parse(personString);

console.log(typeof person);
console.log(person);
*/

const fs = require('fs');

var originalNote = {
    title: 'Some title',
    body:  'Some body'
}

var originalNoteString = JSON.stringify(originalNote); // originalNoteString

fs.writeFileSync('notes.json', originalNoteString);


var noteString = fs.readFileSync('notes.json');

var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);

// You can fix this by specifying specific files to watch or specific file extensions. I'd go with the file extension solution. That would be:
// nodemon -e=js json.js

