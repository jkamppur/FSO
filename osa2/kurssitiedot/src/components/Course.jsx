const Header = ({header}) => {
  return (
    <div>
      <h3> {header} </h3>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Summary =({parts}) => {
  var total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header header={course.name}/>
      <Content parts={course.parts}/>
      <Summary parts={course.parts}/>
    </div>
  )
}

export default Course