const express = require('express')
const fs = require('fs');
const notes = require('express').Router();
const path = require('path');
const app = express();
const { readAndAppend, readFromFile, writeToFile } = require('./utils/fsHelper');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
    );

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );

app.get('/api/notes', (req, res) => readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))));

app.post('/api/notes', (req, res) => {
    const { title, body } = req.body;

    if(title && body) {
        const note = {
            title,
            body,
            id: uuid()
        };
        readAndAppend(note, './db/db.json');

        const response = {
            status: 'success',
            body: note,
        };

        res.json(response);
    } else {
        res.json('An error has occured when creating a new note')
    }
})

app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        console.log(data)
        if (err) {
            res.status(500).send('An error has occured when deleting a note')
        } else {
            const dataParseing = JSON.parse(data);
            for (let i = 0; i < parsedData.length; i++) {
                if (req.params.id === dataParseing[i].id) {
                    dataParseing.splice(i, 1)
                }                
            }
            writeToFile('./db/db.json', dataParseing)
            res.json('Note was deleted successfully');
        }
    })
})


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`))