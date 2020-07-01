import React, { useState } from 'react'
import ReactDOM from 'react-dom'


/*
 * Button-komponentti
 */
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


/*
 * StatisticsLine-komponentti
 */
const StatisticsLine = (props) => {
  return (
    <tr>
     <td>{props.text}</td> 
     <td>{props.value}</td>
     </tr>
  )
} 


/*
 * Statistics-komponentti
 */
const Statistics = (props) => {
  if (props.data[3].value === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <StatisticsLine text='good' value={props.data[0].value} />
        <StatisticsLine text='bad' value={props.data[1].value} />
        <StatisticsLine text='neutral' value={props.data[2].value} />
        <StatisticsLine text='all' value={props.data[3].value} />
        <StatisticsLine text='average' value={props.data[5].value} />
        <StatisticsLine text='positive' value={props.data[6].value} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Laskutoimituksia apumuuttujiin
  const all = good + neutral + bad
  const sum = good - bad
  const avg = sum/all
  const positive = (good/all)*100+'%'

  // Taulukollinen data-olioita
  const data = [
    {
      text: 'good',
      value: good
    },
    {
      text: 'bad',
      value: bad
    },
    {
      text: 'neutral',
      value: neutral
    },
    {
      text: 'all',
      value: all
    },
    {
      text: 'sum',
      value: sum
    },
    {
      text: 'average',
      value: avg
    },
    {
      text: 'positive',
      value: positive
    }
  ]


  const handleBad = () => {
    setBad(bad + 1)
  }

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleBad} text='bad' />
        <Button onClick={handleGood} text='good' />
        <Button onClick={handleNeutral} text='neutral' />
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics data={data} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
