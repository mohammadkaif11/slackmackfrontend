import React from "react";

function SimpleFile(props) {
  //DwonloadFile
  const DownloadFile = (file, extension) => {
    window.location = "http://localhost:5000/download/" + file;
  };

  return (
    <div className="chatCard">
      <div className="heder">
        <span>{props.Object.UserName}</span>
        <span>
          {props.Object.Time} {props.Object.Date}
        </span>
      </div>
      <div className="chatContent">
        <div className="p-3">
           Download File
          <i
            onClick={() => {
              DownloadFile(props.Object.Message, props.Object.FileExtension);
            }}
            class="bi bi-arrow-down-circle-fill mx-2 my-2"
          ></i>

        </div>
      </div>
    </div>
  );
}

export default SimpleFile;
