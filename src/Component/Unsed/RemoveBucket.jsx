import React from 'react'

function RemoveBucket() {
  return (
    <ul style={{ borderTop: "2px solid white" }}>
              <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
                Remove Bucket
              </li>
              {users.length > 0 &&
                users.map((user) => {
                  return (
                    <li
                      style={{
                        listStyle: "none",
                        color: "white",
                        padding: "3px",
                      }}
                      key={user._id || user.UserId}
                    >
                      {user.UserName}
                      <i
                        onClick={() => {
                          RemoveUser(user._id);
                        }}
                        className="bi bi-trash mx-3"
                        style={{ fontSize: "15px" }}
                      ></i>
                    </li>
                  );
                })}
            </ul>
  )
}

export default RemoveBucket