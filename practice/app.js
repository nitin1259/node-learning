console.log("Starting application...");

var fs = require('fs');  // inbuilt module
const _ = require('lodash'); // third party module
const note = require('./notes'); // local file module.

const yargs = require('yargs');

// console.log('Process : ', process.argv)
/*
const inputVar = process.argv[2]
console.log('Command Variable: ' + inputVar)

if (inputVar === 'add') {
    console.log('Add a new note');
} else if (inputVar === 'list') {
    console.log('list down all the nodes');
} else if (inputVar === 'delete') {
    console.log('delete the nodes');
} else if (inputVar === 'read') {
    console.log('read the nodes');
} else {
    console.log('Command not recognised');
}
*/

// introducing third party module - yargs  npm install yargs@4.7.1 --save

const makeObject = (desc, demand, alias) => {
    return {
        describe: desc,
        demand: demand,
        alias: alias
    }
}

// const args = yargs.argv;
// Requiring arguments and advanced yargs
const args = yargs
    .command('add', 'adding new note', {
        title: makeObject('Title of Note', true, 't'),
        body: makeObject('Note body', true, 'b')
    })
    .command('list', 'Return all notes')
    .command('read', 'Read a note from existing notes', {
        title: makeObject('Note title', true, 't')
    })
    .command('delete', 'Remove a note', {
        title : makeObject('delete note title', true, 't')
    })
    .help()
    .argv;
const inputVar = args._[0]
// console.log('Yargs : ', args)

if (inputVar === 'add') {
    const noteCreated = note.addNote(args.title, args.body);
    if (noteCreated) {
        note.logNote(noteCreated)
    } else {
        console.log(`Note with title ${args.title} already exits`)
    }
} else if (inputVar === 'list') {
    const allNotes = note.getAll();
    allNotes.forEach(element => {
        note.logNote(element);
    });
} else if (inputVar === 'delete') {
    const isDeleted = note.deleteNote(args.title);
    var msg = isDeleted ? `${args.title} note removed successfully` : `${args.title} note not found`
    console.log(msg);
} else if (inputVar === 'read') {
    const readNote = note.readNote(args.title);
    if (readNote) note.logNote(readNote); else { console.log('Note not found') }
} else {
    console.log('Command not recognised');
}