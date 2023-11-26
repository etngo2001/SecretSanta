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
app.post("/", (req, res) => {
    res.render('index');
    console.log('rendering index page');
})

app.post("/SSForm", (req, res) => {
    if(req.body.agreedge) { //checks to see if user is able to move onto the form page
        res.render('SSForm');
        console.log('rendering SSForm page');
    }
    res.status(204).send(); //keeps user on current page
})

app.post("/viewSS", (req, res) => {
    if(req.body.agreedge) { //checks to see if user is able to move onto the view giftee page
        res.render('SSForm');
        console.log('rendering SSForm page');
    }
    res.render('viewSS');
    console.log('rendering ViewSS page');
})

app.post("/guessSS", (req, res) => {
    if(req.body.agreedge) { //checks to see if user is able to move onto the guess your ss page
        res.render('SSForm');
        console.log('rendering SSForm page');
    }
    res.render('guessSS');
    console.log('rendering Guess Secret Santa page');
})

app.post("/submit-list", (req, res) => { //triggered on ssform when they submit form, need to run check before doing updating json form
    let data = {
        "name": req.body.name,
        "origin": req.body.origin,
        "wishlist": {
            wish1:req.body.wish1,
            wish2:req.body.wish2,
            wish3:req.body.wish3
        }
    }
    console.log(data)
})

//TODO:
// MOVE TO SS FORM
// MOVE TO VIEW YOUR GIFTEE
    // FUNCTION FOR KEY CHECK/PASSWORD CHECK ON THE VIEW YOUR GIFTEE
// MOVE TO GUESS YOUR SS FORM
    // FUNCTION FOR KEY CHECK/PASSWORD CHECK WHEN GUESSING YOUR SS
// FORM HANDLING - WHEN THEY SUBMIT THEIR FORM, TAKE THE DATA IN AND SAVE IT TO THE JSON
// CREATE A PAGE THAT CONFIRMS THAT THE LIST HAS BEEN received and present the user their key


app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})