import { useState } from "react";
import ChartContext from "./ChartContext";
import axios from "axios";

const ChartState=(props)=>{
  const [users ,setUsers]=useState([])
  const [admin ,setAdmin]=useState([])
  const [currentuser,setCurrentUser]=useState([]);
  const [workspace,setWorkspace]=useState({})
  const [chats,SetChats]=useState([]);
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

    const getChartRoomName=(workspaceurl)=>{
      let config = {
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem("token"),
        }
      }
      axios
        .get(`http://localhost:5000/users/roomName/${workspaceurl}`,config)
        .then((res) => {
          console.log(res.data);
          setWorkSpaceId(res.data.Id);
          setWorkSpaceName(res.data.Name);
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


    return (
        <ChartContext.Provider value={{removeUserApi,getAllUserChats,workspaceName,workspaceId,chats,getAllChats,AddUser,getAllUser,users,admin,currentuser,workspace,getChartRoomName}}>
               {props.children}
        </ChartContext.Provider>
    )
}
export default ChartState;