const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./node')

yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder : {
        title : {
            'describe' : 'Note title',
            demandOption : true,
            type : 'string'
        },
        content : {
            'describe' : 'Note content',
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => notes.addNote(argv.title, argv.content)
})

yargs.command({
    command : 'remove',
    describe : 'remove a note',
    builder : {
        title : {
            'describe' : 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => notes.removeNotes(argv.title)
})

yargs.command({
    command : 'list',
    describe : 'list a note',
    handler : () => {
        console.log(chalk.green.bold.inverse('Your Notes'))
        notes.showNotes()
    }
})

yargs.command({
    command : 'read',
    describe : 'read a note',
    builder : {
        title : {
            'describe' : 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler : (argv) => notes.readNote(argv.title)
})

yargs.parse()