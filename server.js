const express = require('express');
const path = require('path')
const bodyparser = require('body-parser');
const { name } = require('ejs');
var http = require('http');


const PORT = 8080;
const HOST = '0.0.0.0';
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

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`)
})