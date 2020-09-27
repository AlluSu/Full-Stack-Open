import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import personService from './../services/persons'
import './../index.css'
import Notification from './Notification'

const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchCond, setSearch ] = useState('')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const filtered = persons.filter(person => person.name.toUpperCase().startsWith(searchCond.toUpperCase()))
  
  const addNewName = (event) => {
    event.preventDefault()
    const original = persons.find(person => person.name === newName)
    const newPerson = {
        name: newName,
        number: newNumber
    }
    if (checkIfNameNotExists(newPerson.name)) {
        personService
        .create(newPerson)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewNumber(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
        .catch(error => {
          setMessage(
            'Validation error, number and/or name too short?'
          )
          console.log(error.response.data)
        })
    }
    else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService
          .update(original.id, {...original, number : newNumber})
          .then((returnedPerson) => {
              setPersons(persons.map(person => person.name !== original.name ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setMessage(
                `Updated number of ${returnedPerson.name}`
              )
              setTimeout(() => {
                setMessage('')
              }, 5000)
            })
            .catch(error => {
              setMessage(`Information of ${newName} has already been deleted from the server`)
            })
        }
        setPersons(persons)
        setNewName('')
        setNewNumber('')
    }
  }

  const checkIfNameNotExists = (props) => {
      const found = persons.find(person => person.name === props)
      if (found) {
          return false
      }
      return true
  }

  const removePerson = (id) => {
    const person = persons.find( person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?` )) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchList = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={searchCond} onChange={handleSearchList}/>
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addNewName}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {filtered.map((person) =>
      <Persons
      key={person.id}
      person={person}
      deletePerson={() => removePerson(person.id)} 
      />
      )}
    </div>
  )

}

export default App