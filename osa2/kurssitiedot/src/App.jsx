const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const Header = ({header}) => {
    return (
      <div>
        <h2> {header} </h2>
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

    // var total = parts.reduce(function(sum, part) {
    //  return sum + part.exercises
    // }, 0)

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

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App