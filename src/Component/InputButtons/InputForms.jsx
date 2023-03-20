import React from 'react'

function InputForms(props) {
  return (
    <form>
    <textarea
      onChange={props.handleChange}
      value={props.msg}
      name="sendChat"
      className="scroll"
      placeholder="Enter Chats here"
    ></textarea>
  </form>
  )
}

export default InputForms