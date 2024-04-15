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

  const Part = (props) => {
    return (
      <>
        <p> {props.name} {props.exercises} </p>
      </>
    )
  }

  const Content = (props) => {
    return (
      <div>
        <Part name={props.part1} exercises={props.exer1} />
        <Part name={props.part2} exercises={props.exer2} />
        <Part name={props.part3} exercises={props.exer3} />
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
