import React from 'react'

function Channelsbar(props) {
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
            onClick={() => {
              changeChannel(channel.ChannelName);
            }}
            style={{
              listStyle: "none",
              color: "white",
              padding: "3px",
            }}
          >
            #{channel.ChannelName}
          </li>
        );
      })}
  </ul>
  )
}

export default Channelsbar