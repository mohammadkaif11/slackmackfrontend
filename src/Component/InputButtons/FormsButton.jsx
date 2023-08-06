import React from "react";

function FormsButton(props) {
  return (
    <div className="upperbutton">
      <button
        className="btn-clickforbold bodernone"
        id="btn-clickforbold"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <i className="bi bi-type-bold"></i>
      </button>
      <button
        className="btn-clickforitalian bodernone"
        id="btn-clickforitalian"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <i className="bi bi-type-italic"></i>
      </button>
      <button
        className="btn-strikethrough bodernone"
        id="btn-strikethrough"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <i className="fa fa-strikethrough"></i>
      </button>{" "}
      <span>|</span>
      <button
        className="btn-clickforlink bodernone"
        id="btn-clickforlink"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <i className="bi bi-link"></i>
      </button>{" "}
      <span>|</span>
      <button
        className="btn-sendlilist bodernone"
        id="btn-sendlilist"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <i className="bi bi-list-ol"></i>
      </button>{" "}
      <span>|</span>
      <button
        className="btn-sendollist bodernone"
        id="btn-sendollist"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <i className="bi bi-list-ul"></i>
      </button>{" "}
      <span>|</span>
      <button
        className="btn-sendcode bodernone"
        id="btn-sendcode"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <i className="bi bi-code"></i>
      </button>{" "}
      <span>|</span>
      <button
        className="btn-sendcode bodernone"
        id="btn-sendcode"
        style={{
          fontSize: "20px",
          backgroundColor: "rgb(26 29 33)",
          color: "gray",
        }}
      >
        <input
          type="file"
          hidden
          disabled
          onChange={props.handleFileChange}
          ref={props.inputFileRef}
        />
        <i className="bi bi-plus-circle" onClick={props.UploadFile}></i>
      </button>
    </div>
  );
}

export default FormsButton;
