// teht 2.14

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
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  console.log('render', persons.length, 'persons, number', newNumber )

  const personsToShow = newFilter === '' ?
    persons : 
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    if (persons.every(person => person.name !== newName)) {
      personService
          .create({ name: newName, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')  // TODO Number update not visible in browser.
      })
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  const deleteId = (id, name) => {
    console.log(name)
    if (window.confirm('Delete ' +  name +  ' ?')) {
      personService
      .deletePerson(id)
        .then( (deleteData) => {
          console.log(deleteData)
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
