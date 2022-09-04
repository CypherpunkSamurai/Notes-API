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


module.exports = { getNotes, getNote, addNote, delNote,updateNote };