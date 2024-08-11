const Person = (props) => {
    return (
      <div>
        <p key={props.name}> {props.name} {props.number}</p>
      </div>
    )    
  }
  
  export default Person