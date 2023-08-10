import React from 'react'

function CurrentUserbar(props) {
  const currentuser=props.currentuser;
  return (
    <ul style={{ borderTop: "2px solid white" }}>
    {currentuser.length > 0 && (
      <li
        style={{ listStyle: "none", color: "white", padding: "3px" }}
      >
        {currentuser[0].Name} (You)
      </li>
    )}
  </ul>
  )
}

export default CurrentUserbar