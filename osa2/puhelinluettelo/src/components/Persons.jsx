import Person from './Person'

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map(person =>
        <Person key={person.name} name={person.name} number={person.number}/>
      )}
    </div>
  )    
}

export default Persons