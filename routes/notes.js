const express = require('express');
const router = express.Router();

// Base
const base = require('../services/base.js');

// Get All Notes
router.get('/', async function(req, res, next) {
  try {
    var notes = await base.getNotes();
    res.status(200).json({notes: notes});
  } catch (err) {
    res.status(500).json({error: err});
  }
});

// Get 1 Note
router.get('/get/:id', async function(req, res, next) {
  // Get Note ID
  var id = req.params.id;
  if(!id){res.status(400).json({error: "No ID"})};
  // Return the Note
  try {
    var note = await base.getNote(id);
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({error: err});
  }
})

// Add a Note
router.get('/add', async function(req, res, next) {
  // Add a note
  const note_text = req.query.text;
  if(!note_text){res.status(400).json({error: "No text"})}
  // 
  try {
    var result = await base.addNote(note_text);
    res.status(200).json({result: result});
  } catch (err) {
    res.status(500).json({error: err});
  }
});

// Delete a Note
router.get('/delete/:id', async function(req, res, next) {
  // Check for id
  const note_id = req.params.id;
  if(!note_id){req.status(400).json({error: "No id"})}
  //
  try {
    const result = await base.delNote(note_id);
    res.status(200).json({result: result});
  } catch (err) {
    res.status(500).json({error: err});
  }
})


// Update Note
router.get('/update/:id', async function(req, res, next) {
  // Get Note ID and Text Parameters
  const note_id = req.params.id;
  const note_text = req.query.text;
  if(!note_id || !note_text){res.status(400).json({error: "Note id and text are required"})}
  //
  try {
    var result = await base.updateNote(note_id, note_text);
    res.status(200).json({result: result});
  } catch (err) {
    res.status(500).json({error: err});
  }
})

module.exports = router;