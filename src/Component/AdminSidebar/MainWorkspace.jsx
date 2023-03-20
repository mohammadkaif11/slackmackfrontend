import React from "react";

function MainWorkspace(props) {
  const jumptoMainRoom = props.jumptoMainRoom;
  const workspace = props.workspace;
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
        <i
          className="bi bi-person-plus-fill mx-2"
          data-bs-toggle="modal"
          data-bs-target={"#" + workspace.WorkspaceName}
        ></i>
      </li>
    </ul>
  );
}

export default MainWorkspace;
