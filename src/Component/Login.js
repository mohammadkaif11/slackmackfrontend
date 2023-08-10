import React, { useContext,useEffect } from 'react'
import Logo from "../Content/images/chat.png";
import "../Style/Login.css";
import UserContext from '../Context/UserContext';

function Login() {
     const UserState = useContext(UserContext);
     const {Login,user,PostUserDetails}=UserState;
      
     useEffect(() => {
        if(user){
            PostUserDetails();
        }
     }, [user])
     
  return (
    <div>

<div className="Loginheader">
     <img src={Logo} alt="" width="60px" height="60px" /><h1>SLACKMACK</h1>
    </div>
    <div className="LoginContainer">
        <div>
            <h1>Sign in to Slack</h1>
            <p>We suggest using the email address you use at work. </p>
            <div>
                <button className="googlebutton" onClick={Login}>Singin With Google</button>
            </div>
            <div>
                <button className="googlebutton" onClick={Login}>Singup With Google</button>
            </div>
        </div>
    </div> 
    </div>
  )
}

export default Login