console.log("starting notes.js...");

// console.log(module);
// module.exports.age = 25;

/*
module.exports.doFun = () =>{
    console.log('do some fun');
    return 'Note doing Fun';
}
*/

const fs = require('fs');

var addNote = (title, body) => {

    const note = {
        title,
        body
    }
    const notes = reteriveData();
    const duplicateNote = notes.filter(note => note.title === title);
    if (duplicateNote.length === 0) {
        notes.push(note);
        saveData(notes);
        return note;
    }
}

const getAll = () => {
    return reteriveData();
}

const deleteNote = title => {
    // console.log('note deleted ', title);
    const notes = reteriveData();
    const notesLeft = notes.filter(note => note.title !== title);
    saveData(notesLeft)

    return notes.length !== notesLeft.length;

}

const readNote = title => {
    const notes = reteriveData();
    const note = notes.find(note => note.title === title);
    // console.log(note.title, note.body);
    return note;
}


const saveData = (notes) => {
    const notesString = JSON.stringify(notes);
    fs.writeFileSync('notes-data.json', notesString);
}

const reteriveData = () => {
    let notes = []
    try {
        const notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    } catch (err) {
        console.log(err)
    }
    return notes;
}

const logNote = (note) =>{
    // break on this line and use repl to output note
    debugger;
    // use read command with title.
    console.log('-----');
    console.log('Note detail:')
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    deleteNote,
    readNote,
    logNote
}