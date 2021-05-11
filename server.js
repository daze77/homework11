const express = require('express');
const app = express();
const fs = require('fs')
const { v4: uuidv4 } = require('uuid') 


const PORT = process.env.PORT || 3000
const saveFile = 'Develop/db/db.json'

// will share any static html files with the browser
app.use( express.static('Develop/public') );
app.use( express.static('Develop/public/assets/js') );

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data =============================================================
let db = fs.existsSync(saveFile)?
    JSON.parse(fs.readFileSync(saveFile)) :[]

let newNote = []

// Routes (Endpoints)==================================================

app.get('/api/notes', function (req, res) {
    // console.log('[these are all the notes saved] ', db);
    res.send (db)

});



// // trying to get ID ============= see if this working
app.delete(`/api/notes/:id`, function (req, res){
   
    const noteid = req.params.id
    console.log("found:", noteid)
    // this will filter out the one id where the delete button was clicked and the new db will not include that - therefore delted
    db =db.filter(note=>note.id!=noteid)
    res.end()

})

app.post('/api/notes', function (req, res){ 
    const newNote = req.body;
    newNote.id = uuidv4()

    console.log(`I just clicked the save button?`, req.body)
    
    res.send ({message: `New Notes *${newNote.title}, ${newNote.id}*`})
 
    // update the database (db) array
    db.push( newNote)
    
    //save updated db to file
    fs.writeFileSync(saveFile, JSON.stringify(db))
})


app.put(`/api/notes/:id`, function (req, res){ 
    const updatedNote = req.body;
    note.id = req.params.id

    // console.log(`I just clicked the save button?`, req.body)
        console.log(`this is the updateNote`, updatedNote)

    res.send ({message: `UPdated Notes *${updatedNote.title}, ${updatedNote.id}*`})

 
    // update the database (db) array
    dbObjectIndex=db.filter(note=>note.id)
    console.log(dbObjectIndex)
    // db.push( newNote)
    
    //save updated db to file
    fs.writeFileSync(saveFile, JSON.stringify(db))

})



// Listener ==================================================
app.listen(PORT, function() {
    console.log(`We are live on: http://localhost:${PORT}`);
});