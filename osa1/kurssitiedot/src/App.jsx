const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Header = (props) => {
    return (
      <div>
        <h1> {props.course} </h1>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <p> {props.part1} {props.exer1} </p>
        <p> {props.part2} {props.exer2} </p>
        <p> {props.part3} {props.exer3} </p>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} exer1={exercises1} part2={part2} exer2={exercises2} part3={part3} exer3={exercises3}/>
      <Total exercises={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App


