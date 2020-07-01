import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = max => {
  return Math.floor(Math.random()*Math.floor(max))
}

const biggestIndex = array => {
  let biggest = 0
  console.log(array)
  for (let i = 0; i < array.length; i++) {
    if (array[i] > biggest) {
      biggest = i
    } 
  }
  console.log(biggest)
  return biggest
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(() => 0))

  const mostVotes = Math.max.apply(null, votes)
  const mostVotesIndex = votes.indexOf(Math.max.apply(Math, votes))

  const handleNext = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        <p> {props.anecdotes[mostVotesIndex]} has {votes[mostVotesIndex]} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
/*





*/