// teht 1.9

import { useState } from 'react'

const Statistics = (props) => {

  var total_clicks = props.good + props.neutral + props.bad

  if (total_clicks == 0) {
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
      <div>Good {props.good}</div>
      <div>Neutral {props.neutral}</div>
      <div>Bad {props.bad}</div>
      <div>All {total_clicks}</div>
      <div>average {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</div>
      <div>positive {props.good / (props.good + props.neutral + props.bad)} %</div>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>

      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App