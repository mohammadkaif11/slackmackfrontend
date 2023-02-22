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
                <button className="googlebutton" onClick={Login}>Sigin With Google</button>
            </div>
            <div>
                <button className="applebutton" onClick={Login}>Sigin With Apple</button>
            </div>
            <h3>Or</h3>
            <input type="email" name="email" id="email" />
            <div>
                <button className="singupbutton" onClick={Login}>Continue</button>
            </div>
            <p style={{"fontSize": "20px","color": "#4285f4"}}>Already Account?</p>
        </div>
    </div> 
    </div>
  )
}

export default Login