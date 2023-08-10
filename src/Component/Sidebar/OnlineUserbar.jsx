import React from 'react'

function OnlineUserbar(props) {
    const onlineuser=props.onlineuser;
  return (
    <ul style={{ borderTop: "2px solid white" }}>
    <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
      Online Users
    </li>
    {onlineuser.length > 0 &&
      onlineuser.map((user,index) => {
        return (
          <li
          key={index}
            style={{
              listStyle: "none",
              color: "white",
              padding: "3px",
            }}
          >
            {user.Name}{" "}
            <i
              className="bi bi-dot"
              style={{
                color: "green",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            ></i>
          </li>
        );
      })}
  </ul>
  )
}

export default OnlineUserbar