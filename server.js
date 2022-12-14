const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3002;

const app = express();

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//GET Rout for hompage
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (error, data) => {
        console.log(data);
        res.send(data);
    })
}
);

app.post('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (error, data) => {
        console.log(data);
        let notes = JSON.parse(data)
        notes.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(notes), (error, data) => {
            res.send(req.body)
        })
    })
}
);

//GET Route for feedback page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);