import axios from "axios";
import UserContext from "./UserContext";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const UserState = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [groups,setGroups]=useState([]);


  //Login with Google
  const Login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
    },
  });

  //Post google sigin details to backend and save jwt token
  const PostUserDetails = () => {
    if (user.access_token != null) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if(res){
            const Postdata = { profile: JSON.stringify(res.data) };
            axios
              .post("https://slackmackbackend.onrender.com/users/login", Postdata)
              .then((res) => {
                setProfile(res.data.profile);
                if(res.data.token!=""){
                  localStorage.setItem("token", res.data.token);
                  navigate("/workspace");
                }
              });
          }
        })
        .catch((err) =>console.log('Error :', err));
    }
  };

  //get workspaces details
  const getPorfile = () => {
    let config = {
      headers: {
        'auth-token': localStorage.getItem("token"),
      }
    }
    axios
      .get("https://slackmackbackend.onrender.com/getprofile",config)
      .then((res) => {
        setProfile(res.data.profile[0]);
        setWorkspaces(res.data.workspace);
        setGroups(res.data.group)
      }).catch((err)=>{
        console.log('Error :', err);
      });
  };

  //create workspaces
  const createWorkspace = (payLoad) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token"),
      }
    }
    axios
      .post("https://slackmackbackend.onrender.com/workspace/create", payLoad,config)
      .then((res) => {
        return true
      })
      .catch((err) => {
        console.log('Error :', err);
      });
  };
  
  
  return (
    <UserContext.Provider
      value={{
        workspaces,
        groups,
        createWorkspace,
        PostUserDetails,
        Login,
        user,
        profile,
        getPorfile,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
