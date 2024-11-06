import Person from './Person'

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number} onClick={() => props.deletePerson(person.id, person.name)}/>
      )}
    </div>
  )    
}

export default Persons