import { useState } from "react";
import ChartContext from "./ChartContext";
import axios from "axios";

const ChartState=(props)=>{
  const [users ,setUsers]=useState([])
  const [admin ,setAdmin]=useState([])
  const [currentuser,setCurrentUser]=useState([]);
  const [workspace,setWorkspace]=useState({})

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
          alert(res.data)
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

    return (
        <ChartContext.Provider value={{AddUser,getAllUser,users,admin,currentuser,workspace}}>
               {props.children}
        </ChartContext.Provider>
    )
}
export default ChartState;