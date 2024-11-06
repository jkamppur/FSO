const Person = (props) => {
    return (
      <div>
        <p key={props.id}> {props.name} {props.number} <button onClick={props.onClick}> delete </button></p>
      </div>
    )    
  }
  
  export default Person