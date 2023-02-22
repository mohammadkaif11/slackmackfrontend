import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Style/Chart.css";
import UserContext from "../Context/UserContext";
import ChartContext from "../Context/ChartContext";
import SocketContext from "../Context/socket";

function UserChart() {
  const workspaceParameter = useParams();
  const user = useContext(UserContext);
  const chart = useContext(ChartContext);
  const socket = React.useContext(SocketContext);

  const { profile, getPorfile } = user;
  const { getAllUser, currentuser, admin, users } = chart;

  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [isConnected, setIsConnected] = useState(null);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    const workspaceid = workspaceParameter;
    const splitId = workspaceid.id.split("-");
    setWorkspaceName(splitId[1]);
    setWorkspaceId(splitId[0]);
    getAllUser(splitId[0]);
    getPorfile();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.emit("SAVEROOMD", {
      Id: workspaceid.id,
      token: localStorage.getItem("token"),
      socketId: socket.id,
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("GETMSG", (data) => {
      console.log(data);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("GETMSG");
    };
  }, []);

  function SendMessgeToSocket() {
    const workspaceid = workspaceParameter;
    socket.emit("MSG", { Message: "HELLO WORLD", Id: workspaceid.id });
  }

  return (
    <div>
      <div className="clientContainer">
        <div className="sidbar">
          <div className="channelName">{profile.Name}</div>
          <div className="channelList">
            <ul style={{ borderTop: "2px solid white" }}>
              {currentuser.length > 0 && (
                <li
                  style={{ listStyle: "none", color: "white", padding: "3px" }}
                >
                  {currentuser[0].Name} (You)
                </li>
              )}
            </ul>
            <ul style={{ borderTop: "2px solid white" }}>
              {admin.length > 0 && (
                <li
                  style={{ listStyle: "none", color: "white", padding: "3px" }}
                >
                  {admin[0].Name} (admin)
                </li>
              )}
            </ul>
            <ul style={{ borderTop: "2px solid white" }}>
              <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
                All Users
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
                    >
                      {user.UserName}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="chats">
          <div className="channelName">{workspaceName}</div>
          <div className="chatContainer">
            <div className="chatCard">
              <div className="heder">
                <span>Mohammad kaif</span>
                <span>7943</span>
              </div>
              <div className="chatContent">hello how are you</div>
            </div>
          </div>
          <div className="chatForm">
            <div className="upperbutton">
              <button
                className="btn-clickforbold bodernone"
                id="btn-clickforbold"
                style={{
                  fontSize: "20px",
                  backgroundColor: "rgb(26 29 33)",
                  color: "gray",
                }}
              >
                <i className="bi bi-type-bold"></i>
              </button>
              <button
                className="btn-clickforitalian bodernone"
                id="btn-clickforitalian"
                style={{
                  fontSize: "20px",
                  backgroundColor: "rgb(26 29 33)",
                  color: "gray",
                }}
              >
                <i className="bi bi-type-italic"></i>
              </button>
              <button
                className="btn-strikethrough bodernone"
                id="btn-strikethrough"
                style={{
                  fontSize: "20px",
                  backgroundColor: "rgb(26 29 33)",
                  color: "gray",
                }}
              >
                <i className="fa fa-strikethrough"></i>
              </button>{" "}
              <span>|</span>
              <button
                className="btn-clickforlink bodernone"
                id="btn-clickforlink"
                style={{
                  fontSize: "20px",
                  backgroundColor: "rgb(26 29 33)",
                  color: "gray",
                }}
              >
                <i className="bi bi-link"></i>
              </button>{" "}
              <span>|</span>
              <button
                className="btn-sendlilist bodernone"
                id="btn-sendlilist"
                style={{
                  fontSize: "20px",
                  backgroundColor: "rgb(26 29 33)",
                  color: "gray",
                }}
              >
                <i className="bi bi-list-ol"></i>
              </button>{" "}
              <span>|</span>
              <button
                className="btn-sendollist bodernone"
                id="btn-sendollist"
                style={{
                  fontSize: "20px",
                  backgroundColor: "rgb(26 29 33)",
                  color: "gray",
                }}
              >
                <i className="bi bi-list-ul"></i>
              </button>{" "}
              <span>|</span>
              <button
                className="btn-sendcode bodernone"
                id="btn-sendcode"
                style={{
                  fontSize: "20px",
                  backgroundColor: "rgb(26 29 33)",
                  color: "gray",
                }}
              >
                <i className="bi bi-code"></i>
              </button>
            </div>
            <form>
              <textarea
                name="sendChat"
                className="scroll"
                placeholder="Enter Chats here"
              ></textarea>
            </form>
            <div className="lowerbutton">
              <div className="left"></div>
              <div className="right">
                <button
                  className="btn-plane"
                  style={{ backgroundColor: "rgb(49, 110, 49)" }}
                  onClick={SendMessgeToSocket}
                >
                  <i
                    style={{ color: "white" }}
                    className="fas fa-paper-plane"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default UserChart;
