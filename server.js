const express = require('express');
const app = express();
const fs = require('fs')


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





// Routes (Endpoints)==================================================

app.get('/api/notes', function (req, res) {
console.log('[these are all the notes saved] ', db);
res.send (db)

});


app.post('/api/notes', function (req, res){
    console.log(`I just clicked the save button?`, req.body)
    const newNotes = req.body;
    res.send ({message: `New Notes *${newNotes.title}*`})
 
  
    db.push( newNotes)
    //save to file
    fs.writeFileSync(saveFile, JSON.stringify(db))

})















// Listener ==================================================
app.listen(PORT, function() {
    console.log('We are live on PORT ' + PORT);
});