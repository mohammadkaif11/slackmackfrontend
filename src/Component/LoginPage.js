import React from "react";
import "../Style/LoginPage.css";
import Logo from "../Content/images/chat.png";
import video from '../Content/video/hero-product-ui.en-IN.webm';
function LoginPage() {
  return (
    <div>
      <div className="header">
        <nav>
          <div className="nav1 nav liststylenone">
            <ul>
              <li>
                <img
                  src={Logo}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </li>
              <li style={{"marginLeft":"2px"}}>SLACKMACK</li>
              <li>Product</li>
              <li>Solutions</li>
              <li>Entriprise</li>
              <li>Resources</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="nav2 nav liststylenone">
            <ul>
              <li>Sigin</li>
              <li>
                <button className="button1">TALK TO SALES</button>
              </li>
              <li>
                <button className="button2">TRY FOR FREE</button>
              </li>
            </ul>
          </div>
        </nav>
        <div className="homeContainer">
          <div className="content1">
            <h1>
              Great teamwork starts with a
              <span style={{ "color": "#ecb22e!important" }}> digital HQ</span>
            </h1>
            <p>
              With all your people, tools and communication in one place, you
              can work faster and more flexibly than ever before.
            </p>
            <div className="inner_button">
              <button className="button2">Singup With Email Address</button>
              <button className="googlebutton">Singup With Google</button>
            </div>
            <h2>SLACKMACK is free to try for as long as you like</h2>
          </div>
          <div className="content2">
            <video autoPlay={true} loop={true} muted={true}>
              <source src={video}/>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
