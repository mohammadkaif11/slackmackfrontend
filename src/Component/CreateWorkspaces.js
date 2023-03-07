import React, { useContext, useEffect, useState } from "react";
import "../Style/Login.css";
import Logo from "../Content/images/chat.png";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

function CreateWorkspaces() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const userContext = useContext(UserContext);
  const { createWorkspace } = userContext;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == "" || token == undefined) {
      navigate("/Login");
    }
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const Submitform = () => {
    if (name.includes("-") == false && name.trim()!="") {
      const payLoad = {
        workspaceName: name,
        userId: localStorage.getItem("token"),
      };
      createWorkspace(payLoad);
      setName("");
      navigate("/workspace");
    } else {
      alert("Can't use - with workspaceName");
    }
  };

  return (
    <div>
      <div className="Loginheader">
        <img src={Logo} alt="" width="60px" height="60px" />
        <h1>SLACKMACK</h1>
      </div>
      <div className="LoginContainer">
        <div>
          <h1>Create WorkSpace</h1>
          <p>We suggest using unique workspace name</p>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            id="name"
            placeholder="Name of workspace"
          />
          <div>
            <button className="singupbutton" onClick={Submitform}>
              create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspaces;
