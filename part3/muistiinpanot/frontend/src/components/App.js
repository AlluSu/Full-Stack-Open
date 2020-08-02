import React, { useState, useEffect } from 'react'
import noteService from './../services/notes'
import axios from 'axios'
import Note from './Note'
import Notification from './Notification'
import Footer from './Footer'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened')

    const toggleImportanceOf = (id) => {
      const note = notes.find(n => n.id === id)
      const changedNote = {...note, important: !note.important}

      noteService
        .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })

      console.log(`importance of ${id} needs to be toggled`)
    }

    useEffect(() => {
      noteService
        .getAll()
          .then(initialNotes => {
        setNotes(initialNotes)
      })
    }, [])

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length +1,
        }
        
        noteService
          .create(noteObject)
            .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
          <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all' }
          </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note
          key={i}
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
          <input
          value={newNote}
          onChange={handleNoteChange}
          />
          <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App