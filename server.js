const express = require('express');
const path = require('path')
const bodyparser = require('body-parser');
const { name } = require('ejs');
var http = require('http');


const PORT = 8080;
// const HOST = '0.0.0.0';
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render('index');
    console.log('rendering index page');
})

app.get("/guessSS", (req, res) => {
    res.render('guessSS');
    console.log('rendering Guess Secret Santa page');
})

app.post("/send-list", (req, res) => { //triggered on ssform when they submit form, need to run check before doing updating json form
    req
})

//TODO:
// MOVE TO SS FORM
// MOVE TO VIEW YOUR GIFTEE
    // FUNCTION FOR KEY CHECK/PASSWORD CHECK ON THE VIEW YOUR GIFTEE
// MOVE TO GUESS YOUR SS FORM
    // FUNCTION FOR KEY CHECK/PASSWORD CHECK WHEN GUESSING YOUR SS
// FORM HANDLING - WHEN THEY SUBMIT THEIR FORM, TAKE THE DATA IN AND SAVE IT TO THE JSON



app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})