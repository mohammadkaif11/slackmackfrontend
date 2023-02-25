import React, { useState, useContext, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import "../Style/Chart.css";
import UserContext from "../Context/UserContext";
import ChartContext from "../Context/ChartContext";
import SocketContext from "../Context/socket";

function AdminChart() {
  const workspaceParameter = useParams();
  
  const messagesEndRef = useRef(null);
  const inputFileRef = useRef(null);

  const user = useContext(UserContext);
  const chart = useContext(ChartContext);
  const socket = React.useContext(SocketContext);

  const { profile, getPorfile } = user;
  const { getAllUser, currentuser, admin, users,chats,getAllChats } = chart;

  const [message, setMessage] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [isConnected, setIsConnected] = useState(null);
  const [lastPong, setLastPong] = useState(null);
  const [msg, setMsg] = useState("");
  const [onlineuser,setOnlineUsers]=useState([]);
  const [allChats,setAllChats]=useState([]);
  const [file, setFile] = useState([]);
  const [isFile, SetIsFile] = useState(false);

  useEffect(() => {
    const workspaceid = workspaceParameter;
    getAllChats(workspaceid.id);
    const splitId = workspaceid.id.split("-");
    setWorkspaceName(splitId[1]);
    setWorkspaceId(splitId[0]);
    getAllUser(splitId[0]);
    getPorfile();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.emit("SAVEROOMD", {
      Id: workspaceid,
      token: localStorage.getItem("token"),
      socketId: socket.id,
    });

    socket.on("GETUSERNAME", (data) => {
      localStorage.setItem("username", data);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("USERID",(data)=>{
      localStorage.setItem("u-Id",data)
    })

    socket.on("GETMSG", (data) => {
      setMessage((message) => [...message, data]);
      console.log(data);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    socket.on("ONLINEUSER",(data)=>{
      setOnlineUsers(data);
    })


    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("GETMSG");
      socket.off("GETUSERNAME");
      socket.off("ONLINEUSER");
      socket.off("USERID");
    };
  }, []);


  function SendMessgeToSocket() {
    const workspaceid = workspaceParameter;
    var currentDate = new Date();

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
        };
        socket.emit("MSG", sendObj);
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
          };
          socket.emit("upload", file,sendObj, (status) => {
            console.log(status);
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

  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMsg(e.target.files[0].name + "->");
    }
  };

  //UploadFile using Icon
  const UploadFile = () => {
    inputFileRef.current.click();
    SetIsFile(true);
  };

  //Get File Extension
function getFileExtension(filename) {
    const extension = filename.substring(
      filename.lastIndexOf(".") + 1,
      filename.length
    );
    return extension;
  }

  //Change Room Id
const ChangeRoomComponent=(Id)=>{
    console.log(Id)
 }

  return (
    <div>
      <div className="clientContainer">
        <div className="sidbar">
          <div className="channelName">{profile.Name}</div>
          <div className="channelList">
            <ul>
              <li style={{ listStyle: "none", color: "white" }}>
                ADD MEMBER{" "}
                <i
                  class="bi bi-person-plus-fill mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                ></i>
              </li>
            </ul>
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
                    onClick={()=>{ChangeRoomComponent(user.UserId)}}
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
                      {user.Name} <i class="bi bi-dot" style={{color:"green",fontSize:"20px",fontWeight:'bold'}}></i>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="chats">
          <div className="channelName">{workspaceName}</div>
          <div className="chatContainer">
          {chats.length>0 && chats.map((Element) => {
              return (
                <div className="chatCard">
                  <div className="heder">
                    <span>{Element.UserName}</span>
                    <span>
                      {Element.Time} {Element.Date}
                    </span>
                  </div>
                  <div className="chatContent">{Element.Content}</div>
                </div>
              );
            })}
            {message.length > 0 &&
              message.map((Element) => {
                return (
                  <div className="chatCard">
                    <div className="heder">
                      <span>{Element.UserName}</span>
                      <span>  
                        {Element.Time} {Element.Date}
                      </span>
                    </div>
                    <div className="chatContent">{Element.Message}</div>
                  </div>
                );
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
              </button>
            </div>
            <form>
              <textarea
                name="sendChat"
                className="scroll"
                placeholder="Enter Chats here"
                onChange={handleChange}
                value={msg}
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
                {" "}
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
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal />
      </div>
    </div>
  );
}

export default AdminChart;
