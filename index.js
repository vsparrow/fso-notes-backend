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
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, request, response, next) => {
	console.log(error.message)
	if(error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({error: 'malformatted id'})
	}
	next(error)
}

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
// let ObjectId = mongoose.Types.ObjectId //to cast ID from requ.body.id

const generateId = () => {
    const maxID = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxID + 1;
};

//unneeded after using frontend build
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/api/notes/:id', (req, res, next) => {
    // const id = new ObjectId(req.params.id);
    const id =  (req.params.id);
    // const note = notes.find(note => note.id === id);
	Note.findById(id)
	.then(note => {
		if(note){	res.json(note.toJSON()) }
		else { res.status(204).end()}
	})
	// .catch(error => {
	// 	console.log(error)
	// 	res.status(400).send({error: 'malformatted id'})	
	// })
	//If the next function is called with a parameter, then the execution will continue to the error handler middleware.
	.catch(error => next(error))
});

app.get('/api/notes', (req, res) => {
    // res.json(notes); //OLD
	Note.find({}).then(notes=>{
		// res.json(notes) //old
		res.json(notes.map(note => note.toJSON())) 
	})
});

app.delete('/api/notes/:id', (req, res, next) => {
    // const id = Number(req.params.id);
    // notes = notes.filter(note => note.id !== id);
    // res.status(204).end();
	// Note.findById(req.params.id)
	// 	.then(note => res.json(note.toJSON()))
	Note.findByIdAndRemove(req.params.id)
	.then(result => res.status(204).end())
	.catch(error => next(error))
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

app.put('/api/notes/:id',(request,response,next)=>{
	const body = request.body
	const note = {
		content: body.content, 
		important: body.important
	}
	Note.findByIdAndUpdate(request.params.id,note,{new:true})
	.then(updatedNote => response.json(updatedNote.toJSON()))
	.catch(error=>next(error))
})

//START after routes middleware

app.use(unknownEndpoint);
app.use(errorHandler)
//END after routes middleware

//////////////////////////////////////
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});