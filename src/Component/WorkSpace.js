import React from 'react'
import Logo from "../Content/images/chat.png";
import "../Style/Workspace.css";


function WorkSpace() {
  return (
    <div>
<div className="background">
    <div className="homePageHeader">
        <img src={Logo} alt="" width="60px" height="60px"/><h1>SLACKMACK</h1>
       </div>
       <div className="homePageContainer">
           <div className="emailbox">
               <h3>mohammadkaif0211@gmail.com</h3>
           </div>
      </div>
      <div className="homePageContainer">
       <div className="content1">
           <h1 style={{"text-align":"center"}}>Create a new SLACKMACK workspace</h1>
           <p>
            SLACKMACK gives your team a home — a place where they can talk and work together. To create a new workspace, click the button below.
           </p>
           <div className="inner_button">
             <button>Create a workspace</button>
           </div>
           <p>By continuing, you’re agreeing to our Customer Terms of Service, User Terms of Service, Privacy Policy, and Cookie Policy.</p>
         </div>
      </div>
 </div>
   <h2 style={{"text-align": "center", "margin": "50px"}}>Open a WorkSpace</h2>
   <div className="workspaceCards">
       <div className="workspaceCard">
          <h1> workspaces for mohammadkaif0211@gmail.com</h1>
          <hr/>
          <p>Shardings</p>
       </div>
   </div>
 </div>
  )
}

export default WorkSpace