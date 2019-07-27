require('dotenv').config()
const express = require('express');
const app = express();
const {mongopassword} = require('./password')


//START middleware definitions
const bodyParser = require('body-parser');
const cors = require('cors');
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:  ', req.path);
    console.log('Body:  ', req.body);
    console.log('----');
    next();
};
//END middleware definitions

//START call middleware
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);
//END call middleware

//START mongoose definitions 
const mongoose = require('mongoose')
const Note = require('./models/note')

const generateId = () => {
    const maxID = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxID + 1;
};


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        return res.json(note);
    } else {
        return res.status(404).end();
    }
});

app.get('/api/notes', (req, res) => {
    // res.json(notes); //OLD
	Note.find({}).then(notes=>{
		// res.json(notes) //old
		res.json(notes.map(note => note.toJSON())) 
	})
});

app.delete('/api/notes/:id', (req, res) => {
    // const id = Number(req.params.id);
    // notes = notes.filter(note => note.id !== id);
    // res.status(204).end();
	Note.findById(req.params.id)
		.then(note => res.json(note.toJSON()))
});

app.post('/api/notes', (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({ error: 'content missing' });
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    });

    // // note.id = maxID + 1
    // notes = notes.concat(note);
    // // console.log(note)
    // res.json(note);
	note.save().then(savedNote => {
		res.json(savedNote.toJSON())
	})
}); //post

//START after routes middleware
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
//END after routes middleware

//////////////////////////////////////
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});