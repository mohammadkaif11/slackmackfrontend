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
          const Postdata = { profile: JSON.stringify(res.data) };
          axios
            .post("http://localhost:5000/users/login", Postdata)
            .then((res) => {
              setProfile(res.data.profile);
              if(res.data.token!=""){
                localStorage.setItem("token", res.data.token);
                navigate("/workspace");
              }
            });
        })
        .catch((err) => console.log(err));
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
      .get("http://localhost:5000/users/getprofile",config)
      .then((res) => {
        setProfile(res.data.profile[0]);
        setWorkspaces(res.data.workspace);
        setGroups(res.data.group)
      }).catch((error)=>{
        console.log(error);
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
      .post("http://localhost:5000/workspace/create", payLoad,config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
