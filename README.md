# Notes API PostgreSQL



## PostgreSQL
Let's make a database

I got the db url:
```
postgres://oluvrxza:hOxb0uOj2rnvJMGuPiBJkBMqv9i-Ibjv@arjuna.db.elephantsql.com/oluvrxza
```

Let's make a new table and name it 'notes'. We have a id that is autoincremented (serial) and then we have a text column that will be 250 characters long, for storing the contents.
```
CREATE TABLE IF NOT EXISTS notes(
		id		SERIAL PRIMARY KEY NOT NULL,
		text	VARCHAR(250) NOT NULL
);
```

**Note: Keep in mind, the `table_name()` is a table schema syntax. it's like `table_name(column_name type, column_name type);`**

Let's add a few notes for testing

```sql
INSERT INTO notes (text) VALUES 
('Hi World'),
('Hello');

# or in one line
# INSERT INTO notes (text) VALUES ('Hi World'), ('Hello');
```

Basically we are Running...
```sql
CREATE TABLE IF NOT EXISTS notes(id SERIAL, text VARCHAR(250) NOT NULL);

INSERT INTO notes (text) VALUES ('Hi World'), ('Hello');
```

### References:
* https://quickref.me/postgres
* https://www.postgresqltutorial.com/postgresql-cheat-sheet/
* https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/
* https://www.elephantsql.com/blog/databases-for-beginners-what-is-sql-what-is-postgresql.html
* https://geshan.com.np/blog/2021/01/nodejs-postgresql-tutorial/
* https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

## ExpressJS
Now that we have a database, we need a API.

### Creating a Project

First let's make a new npm package and init it.

```shell
npm init
```

Next we install express, pg, dotenv and nodemon.
```
npm i express dotenv nodemon pg
```

### Express App
Let's make a Express App and add routing to it. We will later add CRUD operations to these routes, for now we return json.

Create app.js and paste the following code
```js
// Imports
var express = require('express');
var path = require('path');

// ENV Config
require('dotenv').config()

// for parsing requests
var bodyParser = require('body-parser');
// In case we want to parse auth cookies
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

```

Now, create a folder `routes` and `index.js` and `notes.js`.

`index.js`
```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status: 'running'});
});

module.exports = router;
```

for `notes.js` we first need to create a base.

### Database Connection

For the Database connection we will use `pg` module, first we need to have our connection string in the config.

#### Enviroment Variables

Create a new file in the project folder, `config.js`
```js
const env = process.env;

// Configurations

// PG URL from .env file
const POSTGRESQL_CONFIG_URL = env.POSTGRESQL_CONFIG_URL || "";

// Export the Config Varibles
module.exports = { POSTGRESQL_CONFIG_URL };
```

The code here reads the environment variable `POSTGRESQL_CONFIG_URL` and then sets the variable named `POSTGRESQL_CONFIG_URL` to it. We also use `dotenv` module in the app.js which would allow any .env file to be loaded.

Create a new file `.env` and add the following
```conf
PORT=5000
POSTGRESQL_CONFIG_URL="postgres://YOUR POSTGRE URL"
```

This would allow loading the variables from the code.

#### Connect Database

We create a folder `services` and add a `base.js`
```js
const { response } = require('express');
const Pool = require('pg').Pool;

// For URL
const { POSTGRESQL_CONFIG_URL } = require('../config.js');
const url = require('url')

// Connection Pool
const pool = new Pool({
  connectionString: POSTGRESQL_CONFIG_URL,
});

/*
    Methods Here

*/

// Return Notes
const getNotes = () => {
    // We call a query and then after resolving promise
    // we return the result row
    return pool.query(
        "SELECT * FROM notes ORDER BY id ASC",
    ).then(
        r => r.rows
    );
};

// Get One Note
const getNote = (note_id) => {
    console.log("[base] Getting Note: ", note_id);
    return pool.query(
        "SELECT * FROM notes WHERE id = $1", [note_id]
    ).then(
        r => r.rows
    );
};

// Add Note
const addNote = (note_text) => {
    correctSequence()
    return pool.query(
        "INSERT INTO notes (text) VALUES ($1)",
        [note_text],
    ).then(r => r.rows)
}

// Delete Note
const delNote = (note_id) => {
    return pool.query(
        "DELETE FROM notes WHERE id = $1",
        [note_id]
    ).then(
        r => r.rows
    ).finally(
        correctSequence()
    )
}

// Update Note
const updateNote = (note_id, note_text) => {
    return pool.query(
        "UPDATE notes SET text = $1 WHERE id = $2",
        [note_text, note_id]
    ).then(
        r => r.rows
    )
}


const correctSequence = () => {
    pool.query(
        "SELECT setval('notes_id_seq', max(id)) FROM notes"
    );
}


// Export Functions
module.exports = { getNotes, getNote, addNote, delNote,updateNote };
```

### Testing the code

Use Nodemon app.js to start the server, and test the api endpoints:
* Add		-	http://localhost:5000/notes/add?text=Test
* List		-	http://localhost:5000/notes/
* Update	-	http://localhost:5000/notes/update/1?text=Test
* Delete	-	http://localhost:5000/notes/delete/1

## Credits
- `pg` module documentation
- `expressjs` docs