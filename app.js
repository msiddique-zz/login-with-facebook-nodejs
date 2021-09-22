const express = require('express')
const graph = require('fbgraph');
const session = require('express-session')
const Authenticate = require('./controllers/Authentication')

// Configuration
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
const { post } = require('request');
require("dotenv").config();


const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(session({ secret: "thisecretsecret" }))

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/auth', Authenticate);

// user gets sent here after being authorized
app.get('/UserHasLoggedIn', (req, res) => {
    res.send('User is logged in')
});

port = process.env.PORT
host = process.env.HOST

// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// })

app.listen(port, host, () => { console.log(`Server is listening on ${port}`) })