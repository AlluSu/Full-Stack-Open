import React from 'react'

const Person = ( props ) => {
    return (
        <ul>
        {props.person.name} {props.person.number}
        <button onClick={props.deletePerson}>delete</button>
        </ul>
    )
}

export default Person