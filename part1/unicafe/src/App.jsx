import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad, totalRatings, score }) => {
  if (totalRatings !== 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {totalRatings}</div>
        <div>average {score / totalRatings}</div>
        <div>positive {(good / totalRatings) * 100} %</div>
      </div>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <h3>No feedback given</h3>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)
  const [score, setScore] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotalRatings(totalRatings + 1)
    setScore(score + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotalRatings(totalRatings + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setTotalRatings(totalRatings + 1)
    setScore(score - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"></Button>
      <Button handleClick={handleNeutral} text="neutral"></Button>
      <Button handleClick={handleBad} text="bad"></Button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalRatings={totalRatings}
        score={score}
      ></Statistics>
    </div>
  )
}

export default App
