import React from 'react'

function MainRoombar(props) {
    const jumptoMainRoom=props.jumptoMainRoom;
    const workspace=props.workspace;
  return (
    <ul style={{ borderTop: "2px solid white" }}>
    <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
      Your WorkSpace
    </li>
    <li
      onClick={() => {
        jumptoMainRoom();
      }}
      style={{
        listStyle: "none",
        color: "white",
        padding: "3px",
      }}
    >
      #{workspace.WorkspaceName}
    </li>
  </ul>
  )
}

export default MainRoombar