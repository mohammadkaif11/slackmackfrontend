import { useState } from "react";
import ChartContext from "./ChartContext";
import axios from "axios";

const ChartState=(props)=>{
  const [users ,setUsers]=useState([])
  const [admin ,setAdmin]=useState([])
  const [currentuser,setCurrentUser]=useState([]);
  const [workspace,setWorkspace]=useState({})
  const [chats,SetChats]=useState([]);
  const [channels,SetChannels]=useState([]); 
  const [workspaceId,setWorkSpaceId]=useState("");
  const [workspaceName,setWorkSpaceName]=useState("");

    //add user to workspace
    const AddUser=(payLoad)=>{
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
        axios
        .post("http://localhost:5000/workspace/addgroup", payLoad,config)
        .then((res) => {
          alert(res.data.Message);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //get all User to workspace
    const getAllUser=(workspaceId)=>{
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
      axios
        .get(`http://localhost:5000/workspace/getuser/${workspaceId}`,config)
        .then((res) => {
         console.log(res.data)
         setCurrentUser(res.data.user)
         setAdmin(res.data.admin)
         setWorkspace(res.data.workspace)
         setUsers(res.data.groups)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //const get All Chats 
    const getAllChats=(workspaceId)=>{
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
      axios
        .get(`http://localhost:5000/workspace/chats/${workspaceId}`,config)
        .then((res) => {
          console.log(res.data);
          SetChats(res.data.chat);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //Const Get Chart Room 
    const getChartRoomName=(workspaceurl)=>{
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
      axios
        .get(`http://localhost:5000/workspace/getWorkspacedetails/${workspaceurl}`,config)
        .then((res) => {
          setWorkSpaceId(res.data.Workspace._id);
          setWorkSpaceName(res.data.Workspace.WorkspaceName);
        })
        .catch((err) => {
          console.log(err);
        });
    }




     //const get All Chats 
     const getAllUserChats=(workspaceId,firstUserId,secondUserId)=>{
      let payLoad={
        firstUserId:firstUserId,
        secondUserId:secondUserId
      }
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
      axios
        .post(`http://localhost:5000/workspace/userchats/${workspaceId}`,payLoad,config)
        .then((res) => {
          console.log('-----------get user chats--------------');
          console.log(res.data);
          SetChats(res.data.chat);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //Const Remove User
    const removeUserApi=(id)=>{
      alert("Are you sure");
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
      axios
        .get(`http://localhost:5000/workspace/deleteuser/${id}`,config)
        .then((res) => {
           console.log(res.data);
           alert(res.data.Message)
        })
        .catch((err) => {
          console.log(err);
        });
    }

     //add user to workspace
     const createChannel=(payLoad)=>{
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
        axios
        .post("http://localhost:5000/workspace/createchannel", payLoad,config)
        .then((res) => {
          alert(res.data.Message);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }


     //add getChannels to workspace
    const getChannel=(workspaceId)=>{
      const payLoad={workSpaceId:workspaceId}

      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
        axios
        .post("http://localhost:5000/workspace/getchannels", payLoad,config)
        .then((res) => {
          console.log('---Get Channels---',res.data.Channels);
          SetChannels(res.data.Channels);
        })
        .catch((err) => {
          console.log(err);
        });
    }

   //add user to workspace
   const addChannel=(payLoad)=>{
    let config = {
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token"),
      }
    }
      axios
      .post("http://localhost:5000/workspace/addchannel", payLoad,config)
      .then((res) => {
        alert(res.data.Message);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

   //Const Get Chart Room 
   const getUserChannel=(workspaceurl)=>{
    console.log(workspaceurl);
    let config = {
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token"),
      }
    }
    axios
      .get(`http://localhost:5000/workspace/getChannels/${workspaceurl}`,config)
      .then((res) => {
        alert(res.data.Message);
        SetChannels(res.data.Channel);
      })
      .catch((err) => {
        console.log(err);
      });
  }

    return (
        <ChartContext.Provider value={{getUserChannel,addChannel,channels,getChannel,createChannel,removeUserApi,getAllUserChats,workspaceName,workspaceId,chats,getAllChats,AddUser,getAllUser,users,admin,currentuser,workspace,getChartRoomName}}>
               {props.children}
        </ChartContext.Provider>
    )
}
export default ChartState;