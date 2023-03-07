import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../Style/Chart.css";
import UserContext from "../Context/UserContext";
import ChartContext from "../Context/ChartContext";
import SocketContext from "../Context/socket";

function UserChart() {
  const messagesEndRef = useRef(null);
  const inputFileRef = useRef(null);

  const workspaceParameter = useParams();
  const workspaceid = workspaceParameter;

  const navigate = useNavigate();

  const user = useContext(UserContext);
  const chart = useContext(ChartContext);
  const socket = React.useContext(SocketContext);

  const { profile, getPorfile } = user;
  const {
    getAllUser,
    currentuser,
    admin,
    users,
    chats,
    getAllChats,
    getChartRoomName,
    workspaceName,
    workspaceId,
    workspace,
    getAllUserChats,
  } = chart;

  const [message, setMessage] = useState([]);
  const [isConnected, setIsConnected] = useState(null);
  const [lastPong, setLastPong] = useState(null);
  const [msg, setMsg] = useState("");
  const [onlineuser, setOnlineUsers] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [file, setFile] = useState([]);
  const [isFile, SetIsFile] = useState(false);

  //ForChanging room with users
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [isuser, setIsUser] = useState(false);



  useEffect(() => {
    const splitId = workspaceid.id.split("-");
    //GetProfile and all Userwith Workspace
    getAllUser(splitId[0]);
    getPorfile();

    let IsUserExist = CheckwheatherUserPage();

    if (IsUserExist == true) {
      setUserId(localStorage.getItem("spId"));
      setIsUser(true);
      setUserName(localStorage.getItem("spName"));
    }
    if (isuser == false && IsUserExist == false) {
      getAllChats(workspaceid.id);
      getChartRoomName(workspaceid.id);
    } else {
      //Get chat between two users
      getAllUserChats(workspaceid.id, localStorage.getItem("u-Id"), userid);
      getChartRoomName(null);
    }

    socket.on("connect", () => {
      setIsConnected(true);
    });

    //Automatically connect with default Group
    //User for join two connection
    if (isuser == false) {
      socket.emit("SAVEROOMD", {
        Id: workspaceid,
        token: localStorage.getItem("token"),
        socketId: socket.id,
        isUser: false,
      });
    } else {
      const CommonWorkspaceId = localStorage.getItem("workspaceIdBetw2");
      if (CommonWorkspaceId) {
        socket.emit("SAVEROOMD", {
          Id: CommonWorkspaceId,
          token: localStorage.getItem("token"),
          socketId: socket.id,
          isUser: true,
        });
      }
    }

    //Get userName
    socket.on("GETUSERNAME", (data) => {
      localStorage.setItem("username", data);
    });

    //Get Disconnect
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    //Get UserID
    socket.on("USERID", (data) => {
      localStorage.setItem("u-Id", data);
    });

    //Get Msg
    socket.on("GETMSG", (data) => {
      setMessage((message) => [...message, data]);
      console.log(data);
    });

    //Get Pong
    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    //Get OnlineUser
    socket.on("ONLINEUSER", (data) => {
      setOnlineUsers(data);
    });

    //Get roomId between tow user and join the two user
    socket.on("SENDROOMID", (data) => {
      localStorage.setItem("workspaceIdBetw2", data);
      socket.emit("SAVEROOMD", {
        Id: data,
        token: localStorage.getItem("token"),
        socketId: socket.id,
        isUser: true,
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("GETMSG");
      socket.off("GETUSERNAME");
      socket.off("ONLINEUSER");
      socket.off("USERID");
      socket.off("SENDROOMID");
    };
  }, [userid,isuser]);


  //Send Message to group/Users/file/msg
  function SendMessgeToSocket() {
    const workspaceid = workspaceParameter;
    var currentDate = new Date();
    if (isuser == false) {
      if (msg != "" || msg.trim() != "") {
        if (isFile == false) {
          const sendObj = {
            Message: msg,
            Id: workspaceid.id,
            UserId: localStorage.getItem("u-Id"),
            Date: currentDate.toLocaleDateString(),
            Time: currentDate.toLocaleTimeString(),
            UserName: localStorage.getItem("username"),
            IsFile: false,
            FileExtension: "*",
            withUser: isuser,
          };
          socket.emit("MSG", sendObj);
          sendObj.Id = message.length + 1;
          setMessage((message) => [...message, sendObj]);
          setMsg("");
        } else {
          if (file) {
            const sendObj = {
              Message: file.name,
              Id: workspaceid.id,
              UserId: localStorage.getItem("u-Id"),
              Date: currentDate.toLocaleDateString(),
              Time: currentDate.toLocaleTimeString(),
              UserName: localStorage.getItem("username"),
              IsFile: true,
              FileExtension: getFileExtension(file.name),
              withUser: isuser,
            };
            socket.emit("upload", file, sendObj, (status) => {
              status.message.ResponseObj.Id = message.length + 1;
              setMessage((message) => [...message, status.message.ResponseObj]);
            });
            setMsg("");
            SetIsFile(false);
          } else {
            alert("File is empty");
            return;
          }
        }
      } else {
        alert("Not empty message");
      }
    } else {
      if (msg != "" || msg.trim() != "") {
        if (isFile == false) {
          const sendObj = {
            Message: msg,
            Id: localStorage.getItem("workspaceIdBetw2"),
            UserId: localStorage.getItem("u-Id"),
            Date: currentDate.toLocaleDateString(),
            Time: currentDate.toLocaleTimeString(),
            UserName: localStorage.getItem("username"),
            IsFile: false,
            FileExtension: "*",
            withUser: isuser,
            SecondUserId: localStorage.getItem("spId"),
            SecondUserName: localStorage.getItem("spName"),
            workspaceId: workspaceid.id,
          };
          socket.emit("MSG", sendObj);
          sendObj.Id = message.length + 1;
          setMessage((message) => [...message, sendObj]);
          setMsg("");
        } else {
          if (file) {
            const sendObj = {
              Message: file.name,
              Id: localStorage.getItem("workspaceIdBetw2"),
              UserId: localStorage.getItem("u-Id"),
              Date: currentDate.toLocaleDateString(),
              Time: currentDate.toLocaleTimeString(),
              UserName: localStorage.getItem("username"),
              IsFile: true,
              FileExtension: getFileExtension(file.name),
              withUser: isuser,
              SecondUserId: localStorage.getItem("spId"),
              SecondUserName: localStorage.getItem("spName"),
              workspaceId: workspaceid.id,
            };
            socket.emit("upload", file, sendObj, (status) => {
              status.message.ResponseObj.Id = message.length + 1;
              setMessage((message) => [...message, status.message.ResponseObj]);
            });
            setMsg("");
            SetIsFile(false);
          } else {
            alert("File is empty");
            return;
          }
        }
      } else {
        alert("Not empty message");
      }
    }
  }


  // handle file change
  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  //handle file change
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMsg(e.target.files[0].name + "file have to send");
    }
  };

  //uploadFile 
  const UploadFile = () => {
    inputFileRef.current.click();
    SetIsFile(true);
  };

  //get FileExtension
  function getFileExtension(filename) {
    const extension = filename.substring(
      filename.lastIndexOf(".") + 1,
      filename.length
    );
    return extension;
  }

  //Change Rooms to users
  const ChangeRoomComponent = (obj) => {
    setUserId(obj.userId);
    setUserName(obj.userName);
    localStorage.setItem("spId", obj.userId);
    localStorage.setItem("spName", obj.userName);
    setIsUser(true);
    console.log("Change Room Component call");
    const data = {
      workspaceId: workspaceid,
      from: localStorage.getItem("u-Id"),
      fromName: localStorage.getItem("username"),
      to: obj.userId,
      toName: obj.userName,
    };
    console.log(data);
    socket.emit("createRoom2", data);
    socket.emit("UnscribeRoom",workspaceid.id);
    setMessage([]);
  };

  //Wheater User page when refresh
  const CheckwheatherUserPage = () => {
    if (localStorage.getItem("spId")) {
      return true;
    }
    return false;
  };

  //Jump to main Room
  const JumptoMainRomm = () => {
    if (localStorage.getItem("spId")) {
      socket.emit("UnscribeRoom",localStorage.getItem("workspaceIdBetw2"));
      localStorage.removeItem("spId");
      localStorage.removeItem("spName");
      localStorage.removeItem("workspaceIdBetw2");
      setIsUser(false);
      setUserId("");
      setUserName("");
      setMessage([]);
    }
  };

  //scrolltoBottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
                      key={user._id || user.UserId}
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
            <ul style={{ borderTop: "2px solid white" }}>
              <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
                Online Users
              </li>
              {users.length > 0 &&
                onlineuser.map((user) => {
                  return (
                    <li
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

            <ul style={{ borderTop: "2px solid white" }}>
              <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
                Your WorkSpace
              </li>
              <li
                onClick={() => {
                  JumptoMainRomm();
                }}
                style={{
                  listStyle: "none",
                  color: "white",
                  padding: "3px",
                }}
              >
                {workspace.WorkspaceName}
              </li>
            </ul>
          </div>
        </div>
        <div className="chats">
          {!isuser && <div className="channelName">{workspaceName}</div>}
          {isuser && <div className="channelName">{username}</div>}
          <div className="chatContainer scroll" ref={messagesEndRef}>
            {chats.length > 0 &&
              chats.map((Element) => {
                if (Element.IsFile == false) {
                  return (
                    <div className="chatCard" key={Element._id}>
                      <div className="heder">
                        <span>{Element.UserName}</span>
                        <span>
                          {Element.Time} {Element.Date}
                        </span>
                      </div>
                      <div className="chatContent">{Element.Content}</div>
                    </div>
                  );
                } else {
                  return (
                    <div className="chatCard" key={Element._id}>
                      <div className="heder">
                        <span>{Element.UserName}</span>
                        <span>
                          {Element.Time} {Element.Date}
                        </span>
                      </div>
                      <div className="chatContent">
                        <a
                          href={
                            "http://localhost:5000/download/" + Element.Content
                          }
                        >
                          Dwonload File
                        </a>
                      </div>
                    </div>
                  );
                }
              })}
            {message.length > 0 &&
              message.map((Element) => {
                if (Element.IsFile == false) {
                  return (
                    <div className="chatCard" key={Element.Id}>
                      <div className="heder">
                        <span>{Element.UserName}</span>
                        <span>
                          {Element.Time} {Element.Date}
                        </span>
                      </div>
                      <div className="chatContent">{Element.Message}</div>
                    </div>
                  );
                } else {
                  return (
                    <div className="chatCard" key={Element.Id}>
                      <div className="heder">
                        <span>{Element.UserName}</span>
                        <span>
                          {Element.Time} {Element.Date}
                        </span>
                      </div>
                      <div className="chatContent">
                        <a
                          href={
                            "http://localhost:5000/download/" + Element.Message
                          }
                        >
                          Dwonload File
                        </a>
                      </div>
                    </div>
                  );
                }
              })}
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
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  ref={inputFileRef}
                />
                <i className="bi bi-plus-circle" onClick={UploadFile}></i>
              </button>
            </div>
            <form>
              <textarea
                onChange={handleChange}
                value={msg}
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
