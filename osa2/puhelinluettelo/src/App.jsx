// teht 2.7

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    if (persons.every(person => person.name !== newName))
      setPersons(persons.concat({ name: newName }))
    else
      alert(`${newName} is already added to phonebook`)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <p key={person.name}> {person.name}  </p>
        )}
    </div>
  )

}

export default App
