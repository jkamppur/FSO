// teht 2.7

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    if (persons.every(person => person.name !== newName))
      setPersons(persons.concat({ name: newName, number: newNumber }))
    else
      alert(`${newName} is already added to phonebook`)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter show with: 
          <input value={newFilter}
          onChange={handleFilterChange}/>
        </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
        {personsToShow.map(person =>
          <p key={person.name}> {person.name} {person.number}</p>
        )}
    </div>
  )

}

export default App
