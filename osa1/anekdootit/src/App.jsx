// teht 1.14*

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
    * (max - min + 1)) + min;
  };

  var maxAnec = anecdotes.length-1
  const [selected, setSelected] = useState(randomNumberInRange(0, maxAnec))

  const Button = (props) => (
    <button onClick={props.handleClick}> {props.text}</button>
  )

  const HandleVote = (vote) => {
    var copy = [...votes]
    copy[vote] += 1
    setVotes(copy)
  }

  const Statistics = (props) => {
    var maxVotes = Math.max(...props.votes)
    var maxVotesIndex = [props.votes.indexOf(maxVotes)]

    return (
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{props.anecdotes[maxVotesIndex]}</div>
        <div>has {maxVotes} votes</div>
      </div>
    )
  }

  const Anecdotes = (props) => {
    return (
      <div>
      <h2>Anecdote of the day</h2>
        <div>{props.anecdotes[props.selected]}</div>
        <div>has {props.votes[props.selected]} votes </div>
      </div>
    )
  }

  return (
    <div>
      <Anecdotes anecdotes={anecdotes} votes={votes} selected={selected}/>
      <Button handleClick={() => HandleVote(selected)} text="vote"/>
      <Button handleClick={() => setSelected(randomNumberInRange(0, maxAnec))} text="next anecdote"/>
      <Statistics votes={votes} anecdotes={anecdotes}/>
  </div>
  )
}

export default App