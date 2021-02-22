const express = require('express');
const app = express();
const fs = require('fs')

const PORT = process.env.PORT || 3000
const saveFile = './db.json'

// will share any static html files with the browser
app.use( express.static('Develop/public') );

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data =============================================================
let db = fs.existsSync(saveFile)?
    JSON.parse(fs.readFileSync(saveFile)) :[]







app.get('/api/notes', function (req, res) {
console.log('[these are the notes] ', db);
res.send(db)

// const newNotes = req.body;
// res.send ({message: `Here we go: ${newNotes.note-title} ${newNotes.note-textarea} ${newNotes.save-note} ${newNotes.new-note} ${newNotes.list-container}`})

});



// Listener ==================================================
app.listen(PORT, function() {
    console.log('We are live on PORT ' + PORT);
});