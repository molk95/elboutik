import React from 'react'
import Alert from 'react-bootstrap/Alert'
const ErrorMessege = (props) => {
  return (
    <Alert variant={props.variant || 'info' }>{props.children} </Alert>
 )
}

export default ErrorMessege