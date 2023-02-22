import React, { useContext, useEffect } from "react";
import Logo from "../Content/images/chat.png";
import "../Style/Workspace.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChartContext from "../Context/ChartContext";
import UserContext from "../Context/UserContext";

function WorkSpace() {
  const user = useContext(UserContext);
  const { profile, getPorfile, workspaces, groups } = user;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == "" || token == undefined || profile == []) {
      navigate("/Login");
    }
    getPorfile();
  }, []);

  const GoCreateWorkspace = () => {
    navigate("/createworkspace");
  };

  const Logout = () => {
    localStorage.clear("token");
    navigate("/Login");
  };

  return (
    <div>
      <div className="background">
        <div className="homePageHeader">
          <img src={Logo} alt="" width="60px" height="60px" />
          <h1>SLACKMACK</h1>
        </div>
        <div className="homePageContainer">
          <div className="emailbox">
            <h3>{profile.Email}</h3>
          </div>
        </div>
        <div className="homePageContainer">
          <div className="emailbox">
            <button className="btn btn-dark" onClick={Logout}>
              Logout
            </button>
          </div>
        </div>
        <div className="homePageContainer">
          <div className="content1">
            <h1 style={{ textAlign: "center" }}>
              Create a new SLACKMACK workspace
            </h1>
            <p>
              SLACKMACK gives your team a home — a place where they can talk and
              work together. To create a new workspace, click the button below.
            </p>
            <div className="inner_button">
              <button onClick={GoCreateWorkspace}>Create a workspace</button>
            </div>
            <p>
              By continuing, you’re agreeing to our Customer Terms of Service,
              User Terms of Service, Privacy Policy, and Cookie Policy.
            </p>
          </div>
        </div>
      </div>
      <h2 style={{ textAlign: "center", margin: "50px" }}>Your Organization</h2>
      <div className="workspaceCards">
        {workspaces.map((element) => {
          return (
            <div className="workspaceCard">
              <h1> workspaces for {profile.Email}</h1>
              <hr />
              <Link
                to={"/chartAdmin/" + element._id + "-" + element.WorkspaceName}
              >
                {element.WorkspaceName}
              </Link>
            </div>
          );
        })}
      </div>
      {groups.length > 0 && (
        <div>
          <h2 style={{ textAlign: "center", margin: "50px" }}>
            Your WorkSpaces
          </h2>
          <div className="workspaceCards">
            {groups.map((element) => {
              return (
                <div className="workspaceCard">
                  <h1> workspaces for {profile.Email}</h1>
                  <hr />
                  <Link
                    to={
                      "/chartUser/" +
                      element.WorkspaceId +
                      "-" +
                      element.WorkspaceName
                    }
                  >
                    {element.WorkspaceName}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkSpace;
