import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
  const totalEx = course.parts.reduce(
    (accumulator, currentVal) => accumulator + currentVal.exercises,
    0
  )
  return (
    <div>
      <ul>
        {course.parts.map((part) => (
          <li key={part.id}>
            <Part name={part.name} exercises={part.exercises} />
          </li>
        ))}
      </ul>
      <h4>total of {totalEx} exercises</h4>
    </div>
  )
}

export default Content
