import React from "react";

function SimpleChatbox(props) {
  return (
    <div className="chatCard" >
      <div className="heder">
        <span>{props.Object.UserName}</span>
        <span>
          {props.Object.Time} {props.Object.Date}
        </span>
      </div>
      <div className="chatContent">{props.Object.Content}</div>
    </div>
  );
}

export default SimpleChatbox;
