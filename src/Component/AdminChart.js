import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import "../Style/Chart.css";
import UserContext from "../Context/UserContext";
import ChartContext from "../Context/ChartContext";
import SocketContext from "../Context/socket";
import CreateChannelModal from "../Modal/CreateChannelModal";
import AddUserWorkspaceModal from "../Modal/AddUserWorkspaceModal";
import AddUserChannelModal from "../Modal/AddUserChannelModal";
import CurrentUserbar from "./Sidebar/CurrentUserbar";
import Adminbar from "./Sidebar/Adminbar";
import AllUserbar from "./Sidebar/AllUserbar";
import OnlineUserbar from "./Sidebar/OnlineUserbar";
import CreateChannels from "./AdminSidebar/CreateChannels";
import MainWorkspace from "./AdminSidebar/MainWorkspace";
import ChannelsWorkspace from "./AdminSidebar/ChannelsWorkspace";
import SimpleChatbox from "./Chats/SimpleChatbox";
import SimpleFile from "./Chats/SimpleFile";
import PngFile from "./Chats/PngFile";
import JpgFile from "./Chats/JpgFile";
import MsgSimpleChatbox from "./SendMessage/MsgSimpleChatbox";
import MsgSimpleFile from "./SendMessage/MsgSimpleFile";
import MsgPngFile from "./SendMessage/MsgPngFile";
import MsgJpgFile from "./SendMessage/MsgJpgFile";
import FormsButton from "./InputButtons/FormsButton";
import InputForms from "./InputButtons/InputForms";
import LowerButtons from "./InputButtons/LowerButtons";

function AdminChart() {
  const navigate = useNavigate();
  const workspaceParameter = useParams();
  const workspaceid = workspaceParameter;

  const inputFileRef = useRef(null);
  const messagesEndRef = useRef(null);

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
    removeUserApi,
    getChannel,
    channels,
  } = chart;

  const [message, setMessage] = useState([]);
  const [isConnected, setIsConnected] = useState(null);
  const [lastPong, setLastPong] = useState(null);
  const [msg, setMsg] = useState("");
  const [onlineuser, setOnlineUsers] = useState([]);
  const [file, setFile] = useState([]);
  const [isFile, SetIsFile] = useState(false);

  //ForChanging room with users
  const [userid, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [isuser, setIsUser] = useState(false);
  const [currentRoom, SetCurrentRoom] = useState("");

  useEffect(() => {
    scrollToBottom();
    const splitId = workspaceid.id.split("-");
    getChartRoomName(splitId[0]);
    SetCurrentRoom(splitId[1]);
    getAllUser(splitId[0]);
    getPorfile();
    getChannel(splitId[0]);

    let IsUserExist = CheckwheatherUserPage();
    if (IsUserExist == true) {
      setUserId(localStorage.getItem("spId"));
      setIsUser(true);
      setUserName(localStorage.getItem("spName"));
    }

    if (isuser == false && IsUserExist == false) {
      //Get all chart within groups and group name
      //get all Chart with   current
      getAllChats(workspaceid.id);
    } else {
      //Get all Chart between the users
      getAllUserChats(splitId[0], localStorage.getItem("u-Id"), userid);
    }

    socket.on("connect", () => {
      setIsConnected(true);
    });

    //Automatically join with default Group or within user
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

    socket.on("GETUSERNAME", (data) => {
      localStorage.setItem("username", data);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("USERID", (data) => {
      localStorage.setItem("u-Id", data);
    });

    socket.on("GETMSG", (data) => {
      setMessage((message) => [...message, data]);
      scrollToBottom();
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    socket.on("ONLINEUSER", (data) => {
      setOnlineUsers(data);
    });

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
  }, [userid, isuser, currentRoom]);

  //To ScrollTobottom();
  useEffect(() => {
    scrollToBottom();
  }, [userid, isuser, currentRoom]);

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
              console.log(status);
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
            workspaceId:workspaceId,
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
              workspaceId:workspaceId,
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
    scrollToBottom();
  }

  // handle msg change
  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  //handle file Change
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


  //Check when Refresh the user Page or not
  const CheckwheatherUserPage = () => {
    if (localStorage.getItem("spId")) {
      return true;
    }
    return false;
  };

  //Const Remove User
  const RemoveUser = (id) => {
    const splitId = workspaceid.id.split("-");
    removeUserApi(id);
    getAllUser(splitId[0]);
    getPorfile();
  };

  //scrolltoBottom
  const scrollToBottom = () => {
    document
      .getElementsByClassName("chatContainer")[0]
      .scroll(0, messagesEndRef.current.clientHeight * 10000);
  };

   //jump to main room ||User -->MainRoom ,Channel --> MainRoom
   const jumptoMainRoom = () => {
    const splitId = workspaceid.id.split("-");
    if (localStorage.getItem("spId")) {
      socket.emit("UnscribeRoom", localStorage.getItem("workspaceIdBetw2"));
      setIsUser(false);
      setUserId("");
      setUserName("");
      setMessage([]);
      localStorage.removeItem("spId");
      localStorage.removeItem("spName");
      localStorage.removeItem("workspaceIdBetw2");
    } else {
      socket.emit("UnscribeRoom",workspaceid.id);
      setMessage([]);
      SetCurrentRoom(workspaceName);
      navigate(`/chartAdmin/${splitId[0]}-${workspaceName}`);
    }
  };

  //Change Rooms to users || Main-->User,User-=>User,Channel-->User
  const ChangeRoomComponent = (obj) => {
      const CommonWorkspaceId = localStorage.getItem("workspaceIdBetw2");
      if(CommonWorkspaceId){
        socket.emit("UnscribeRoom",CommonWorkspaceId);
      }
      socket.emit("UnscribeRoom",workspaceid.id);
      setUserId(obj.userId);
      setUserName(obj.userName);
      localStorage.setItem("spId", obj.userId);
      localStorage.setItem("spName", obj.userName);
      setIsUser(true);
      const data = {
        workspaceId: workspaceId,
        from: localStorage.getItem("u-Id"),
        fromName: localStorage.getItem("username"),
        to: obj.userId,
        toName: obj.userName,
      };
      socket.emit("createRoom2", data);
      setMessage([]);
    };


  //Change Channel  || Channel -->Channel,User-->Channel,Main-->Channel
  const changeChannel = (channelName) => {
    const splitId = workspaceid.id.split("-");
    //CHECK if User is on 
    if (localStorage.getItem("spId")) {
      socket.emit("UnscribeRoom", localStorage.getItem("workspaceIdBetw2"));
      localStorage.removeItem("spId");
      localStorage.removeItem("spName");
      localStorage.removeItem("workspaceIdBetw2");
      setIsUser(false);
      setUserId("");
      setUserName("");
      SetCurrentRoom(channelName);
      setMessage([]);
      navigate(`/chartAdmin/${splitId[0]}-${channelName}`);
    } else {
      socket.emit("UnscribeRoom",workspaceid.id);
      SetCurrentRoom(channelName);
      setMessage([]);
      navigate(`/chartAdmin/${splitId[0]}-${channelName}`);
    }
  };

  return (
    <div>
      <div className="clientContainer">
        <div className="sidbar">
          <div className="channelName">{profile.Name}</div>
          <div className="channelList">
            <CurrentUserbar currentuser={currentuser} />
            <Adminbar admin={admin} />
            <AllUserbar
              users={users}
              ChangeRoomComponent={ChangeRoomComponent}
            />
            <OnlineUserbar onlineuser={onlineuser} />
            <CreateChannels />
            <MainWorkspace
              jumptoMainRoom={jumptoMainRoom}
              workspace={workspace}
            />
            <ChannelsWorkspace
              channels={channels}
              changeChannel={changeChannel}
            />
          </div>
        </div>
        <div className="chats">
          {!isuser && <div className="channelName">{currentRoom}</div>}
          {isuser && <div className="channelName">{username}</div>}
          <div className="chatContainer scroll" ref={messagesEndRef}>
            {chats.length > 0 &&
              chats.map((Element,Index) => {
                if (Element.IsFile == false) {
                  return <SimpleChatbox Object={Element} key={Index}/>;
                } else {
                  if (Element.FileExtension == "png") {
                    return <PngFile Object={Element}  key={Index}/>;
                  } else if (Element.FileExtension == "jpg") {
                    return <JpgFile Object={Element} key={Index}/>;
                  } else {
                    return <SimpleFile Object={Element}  key={Index}/>;
                  }
                }
              })}

            {message.length > 0 &&
              message.map((Element,Index) => {
                if (Element.IsFile == false) {
                  return <MsgSimpleChatbox Object={Element} key={Index} />;
                } else {
                  if (Element.FileExtension == "png") {
                    return (<MsgPngFile Object={Element} key={Index} />);
                  } else if (Element.FileExtension == "jpg") {
                    return (<MsgJpgFile Object={Element} key={Index} />);
                  } else {
                    return (<MsgSimpleFile Object={Element} key={Index}/>);
                  }                
                }
              })}
          </div>
          <div className="chatForm">
            <FormsButton UploadFile={UploadFile} inputFileRef={inputFileRef} handleFileChange={handleFileChange} />
            <InputForms handleChange={handleChange}  msg={msg}/>
            <LowerButtons SendMessgeToSocket={SendMessgeToSocket} />
          </div>
        </div>
      </div>
      <div>
        <CreateChannelModal />
        
        <AddUserWorkspaceModal
          WorkspaceId={workspaceId}
          channelName={workspaceName}
          ModalId={workspaceName}
        />

        {channels.length > 0 &&
          channels.map((channel, Index) => {
            return (
              <AddUserChannelModal
                key={Index}
                channelId={channel._id}
                WorkspaceId={workspaceId}
                channelName={channel.ChannelName}
                ModalId={channel.ChannelName}
              />
            );
          })}

      
      </div>
    </div>
  );
}

export default React.memo(AdminChart);
