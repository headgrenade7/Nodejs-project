const add = require("./utils")
const fs = require('fs')
const chalk = require('chalk')
const { title } = require("process")

const message = function(){
    return 'Your notes...'
}

const addNote = (title, content) => {
    const notes = loadNote()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            content: content
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note Added'))
    }
    else{
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNotes = (title) => {
    const notes = loadNote()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note Removed'))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('Note Not find'))
    }
}

const readNote = (title) => {
    const notes = loadNote()
    const noteToRead = notes.find((note) => note.title === title)

    if(noteToRead)
    {
        console.log(chalk.yellow.bold.inverse(noteToRead.title))
        console.log(noteToRead.content)
    }
    else
    {
        console.log(chalk.red.inverse('No Note Found'))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const showNotes = () => {
    const notes = loadNote()
    notes.forEach((title) => {
        console.log(chalk.yellow.bold(title.title))
    })
}

const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

module.exports = {
    message: message,
    addNote: addNote,
    removeNotes: removeNotes,
    showNotes: showNotes,
    readNote: readNote
}