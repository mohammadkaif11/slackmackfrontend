import React from 'react'

function CreateChannels() {
  return (
    <ul style={{ borderTop: "2px solid white" }}>
    <li style={{ listStyle: "none", color: "white" }}>
      Create Channels{" "}
      <i
        className="bi bi-plus mx-2"
        data-bs-toggle="modal"
        data-bs-target="#createChannelsButton"
      ></i>
    </li>
  </ul>
  )
}

export default CreateChannels