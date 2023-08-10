import React from 'react'

function LowerButtons(props) {
  return (
    <div className="lowerbutton">
    <div className="left"></div>
    <div className="right">
      <button
        className="btn-plane"
        style={{ backgroundColor: "rgb(49, 110, 49)" }}
        onClick={props.SendMessgeToSocket}
      >
        <i
          style={{ color: "white" }}
          className="fas fa-paper-plane"
        ></i>
      </button>
    </div>
  </div>
  )
}

export default LowerButtons