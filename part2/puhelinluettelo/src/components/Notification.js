import React from 'react'

const Notification = ({message}) => {

    if (message.startsWith('Added')) {
        return (
            <div className="addPerson">
                {message}
            </div>
        )
    }

    
    if (message.startsWith('Deleted')) {
        return (
            <div className="removePerson">
                {message}
            </div>
        )
    }

    
    if (message.startsWith('Updated')) {
        return (
            <div className="numberChange">
                {message}
            </div>
        )
    }


    if (message.startsWith('Information')) {
        return (
            <div className="updateFailed">
                {message}
            </div>
        )
    }
    
    

    return ''
}

export default Notification