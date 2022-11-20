import React from 'react'
import "../Style/Chart.css";
function Chart() {
  return (
    <div>
        <div className="ClientTemp">

</div>
<div className="clientContainer">
   <div className="sidbar">
      <div className="channelName">
        Shardings
      </div>
      <div className="channelList">
        <ul>
            <li><button>#Genral</button></li>
            <li><button>#Random</button></li>
            <li><button>#Software</button></li>
       </ul>
      </div>
   </div>
   <div className="chats">
    <div className="channelName">
        Shardings
    </div>
    <div className="chatContainer">
    </div>
    <div className="chatForm">
        <div className="upperbutton">
            <button className="btn-clickforbold bodernone" id="btn-clickforbold"
            style={{"fontSize": "20px", "backgroundColor":  "rgb(26 29 33)" ,"color": "gray"}}><i
                className="bi bi-type-bold"></i></button>
        <button className="btn-clickforitalian bodernone" id="btn-clickforitalian"
            style={{"fontSize": "20px", "backgroundColor":  "rgb(26 29 33)" ,"color": "gray"}}><i
                className="bi bi-type-italic"></i></button>
        <button className="btn-strikethrough bodernone" id="btn-strikethrough"
            style={{"fontSize": "20px", "backgroundColor":  "rgb(26 29 33)" ,"color": "gray"}}><i
                className="fa fa-strikethrough"></i></button> <span>|</span>
        <button className="btn-clickforlink bodernone" id="btn-clickforlink"
            style={{"fontSize": "20px", "backgroundColor":  "rgb(26 29 33)" ,"color": "gray"}}><i
                className="bi bi-link"></i></button> <span>|</span>
        <button className="btn-sendlilist bodernone" id="btn-sendlilist"
            style={{"fontSize": "20px", "backgroundColor":  "rgb(26 29 33)" ,"color": "gray"}}><i
                className="bi bi-list-ol"></i></button> <span>|</span>
        <button className="btn-sendollist bodernone" id="btn-sendollist"
            style={{"fontSize": "20px", "backgroundColor":  "rgb(26 29 33)" ,"color": "gray"}}><i
                className="bi bi-list-ul"></i></button> <span>|</span>
        <button className="btn-sendcode bodernone" id="btn-sendcode"
            style={{"fontSize": "20px", "backgroundColor":  "rgb(26 29 33)" ,"color": "gray"}}><i
                className="bi bi-code"></i></button>
        </div>
         <form>
            <textarea name="sendChat"  className="scroll" placeholder="Enter Chats here"></textarea>
        </form>
        <div className="lowerbutton">
         <div className="left">

         </div>
         <div className="right">
            <button className="btn-plane" style={{"backgroundColor": "rgb(49, 110, 49)"}}><i
                style={{"color":"white" }}className="fas fa-paper-plane"></i></button>
         </div>
        </div>
    </div>
   </div>
</div>
    </div>
  )
}

export default Chart