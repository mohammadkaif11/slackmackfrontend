import React from "react";

function MsgSimpleChatbox(props) {
  return (
    <div className="chatCard" >
      <div className="heder">
        <span>{props.Object.UserName}</span>
        <span>
          {props.Object.Time} {props.Object.Date}
        </span>
      </div>
      <div className="chatContent">{props.Object.Message}</div>
    </div>
  );
}

export default MsgSimpleChatbox;
