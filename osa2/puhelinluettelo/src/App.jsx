// teht 2.15

import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonFilter from './components/PersonFilter'
import personService from './services/persons.js'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  // Filter
  const personsToShow = newFilter === '' ?
    persons : 
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  // Add button handler
  const addName = (event) => {
    event.preventDefault()
    if (persons.every(person => person.name !== newName)) {
      personService
          .create({ name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
      })
    }
    else {
      if (window.confirm(newName + ' is already added to phonebook. Replace the old number with a new one?')) {
        const person = persons.find(p => p.name === newName)  // find person to be updated, id is needed
        personService.update(person.id, { name: newName, number: newNumber }).then(response => 
          setPersons(persons.map(person => person.name !== newName ? person : response))
        )
      }
    }
  }

  // Delete button handler
  const deleteId = (id, name) => {
    if (window.confirm('Delete ' +  name +  ' ?')) {
      personService
      .deletePerson(id)
        .then( () => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter setNewFilter={setNewFilter}/>
      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>
          name: 
          <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number:
          <input number={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} deletePerson={deleteId}/>
    </div>
  )

}

export default App
