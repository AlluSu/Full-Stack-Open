import React from 'react'

const Course = (props) => {
    console.log(props.course)
    console.log(props.course.name)
    console.log(props.course.parts)
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total amount={props.course.parts} />
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h2>{props.course}</h2>
      </div>
    )
  }
  
  const Content = (props) => {
    const courseinfo  = props.parts
    console.log(courseinfo)
    return (
      <div>
        {courseinfo.map(course => 
        <Part key={course.id} part={course.name} exercise={course.exercises} />)}
      </div>
    )
  }
  
  
  const Total = (props) => {
    const courseinfo = props.amount
    console.log(courseinfo)
    let amount = courseinfo.reduce( (sum, exercise) => {
      return sum + exercise.exercises
    }, 0)
    return (
      <div>
        <p><strong>total of exercises {amount}</strong> </p>
      </div>
    )
  } 
  
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercise}</p>
      </div>
    )
  }

  export default Course