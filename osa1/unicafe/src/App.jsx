// teht 1.11*

import { useState } from 'react'

const StatisticsLine = (props) => {
  if (props.text != "positive") {
    return (
      <tr>
        <td>{props.text}</td><td>{props.value}</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td><td>{props.value} %</td>
    </tr>
  )

}

const Statistics = (props) => {

  var totalClicks = props.good + props.neutral + props.bad

  if (totalClicks == 0) {
    return (
      <div>
      <h2>statistics</h2>
      No Feedback given
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.good}/>
            <StatisticsLine text="neutral" value={props.neutral}/>
            <StatisticsLine text="bad" value={props.bad}/>
            <StatisticsLine text="all" value={totalClicks}/>
            <StatisticsLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}/>
            <StatisticsLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100}/>  
          </tbody>
        </table>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App