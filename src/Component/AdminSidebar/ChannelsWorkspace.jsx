import React from "react";

function ChannelsWorkspace(props) {
  const channels = props.channels;
  const changeChannel = props.changeChannel;
  return (
    <ul style={{ borderTop: "2px solid white" }}>
      <li style={{ listStyle: "none", color: "grey", padding: "3px" }}>
        Your Channels
      </li>
      {channels.length > 0 &&
        channels.map((channel, Index) => {
          return (
            <li
             key={Index}
              style={{
                listStyle: "none",
                color: "white",
                padding: "3px",
                position: "relative",
              }}
            >
              <span
                onClick={() => {
                  changeChannel(channel.ChannelName);
                }}
              >
                #{channel.ChannelName}
              </span>
              <div style={{ position: "absolute", right: "0", top: "0" }}>
                <i
                  className="bi bi-person-plus-fill mx-2"
                  data-bs-toggle="modal"
                  data-bs-target={"#" + channel.ChannelName}
                ></i>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

export default ChannelsWorkspace;
