// teht 1.10

import { useState } from 'react'

const StatisticsLine = (props) => {
  if (props.text != "positive") {
    return (
      <div>{props.text} {props.value}</div>
    )
  }
  return (
    <div>{props.text} {props.value} %</div>
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
      <StatisticsLine text="good" value={props.good}/>
      <StatisticsLine text="neutral" value={props.neutral}/>
      <StatisticsLine text="bad" value={props.bad}/>
      <StatisticsLine text="all" value={totalClicks}/>
      <StatisticsLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}/>
      <StatisticsLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100}/>  
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