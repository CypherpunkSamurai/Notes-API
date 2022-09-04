var express = require('express');
var path = require('path');

// ENV Config
require('dotenv').config()

// for parsing requests
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');


// Express App
var app = express();

// Parsers
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// app.use(cookieParser());


// Routers
var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes');

// Routes
app.use('/', indexRouter);
app.use('/notes', notesRouter);

// Static Routing
app.use(express.static(path.join(__dirname, 'public')));


// Export
module.exports = app;



// Run Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});

