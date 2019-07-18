const express = require('express');
const app = express();

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

const generateId = () => {
    const maxID = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxID + 1;
};

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only Javascript',
        date: '2019-05-30T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);

    if (note) {
        return res.json(note);
    } else {
        return res.status(404).end();
    }
});

app.get('/notes', (req, res) => {
    res.json(notes);
});

app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
});

app.post('/notes', (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({ error: 'content missing' });
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    };

    // note.id = maxID + 1
    notes = notes.concat(note);
    // console.log(note)
    res.json(note);
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