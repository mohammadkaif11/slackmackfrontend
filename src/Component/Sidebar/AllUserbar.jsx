import React from 'react'

function AllUserbar(props) {
  const users=props.users;
  const ChangeRoomComponent=props.ChangeRoomComponent;
  return (
    <ul style={{ borderTop: "2px solid white" }}>
    <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
      All Users
    </li>
    {users.length > 0 &&
      users.map((user,index) => {
        return (
          <li
            key={index}
            onClick={() => {
              ChangeRoomComponent({
                userId: user.UserId,
                userName: user.UserName,
              });
            }}
            style={{
              listStyle: "none",
              color: "white",
              padding: "3px",
            }}
          >
            {user.UserName}
          </li>
        );
      })}
  </ul>
  )
}

export default AllUserbar