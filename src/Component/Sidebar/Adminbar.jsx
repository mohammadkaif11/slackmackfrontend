import React from "react";

function Adminbar(props) {
    const admin=props.admin;
  return (
    <ul style={{ borderTop: "2px solid white" }}>
      {admin.length > 0 && (
        <li style={{ listStyle: "none", color: "white", padding: "3px" }}>
          {admin[0].Name} (admin)
        </li>
      )}
    </ul>
  );
}

export default Adminbar;
