import React from "react";
import { ChatRounded } from "@material-ui/icons";
import "./styles.css";

const Alert = ({ messageAlert }) => {
  return (
    <div className="message-alert-popup">
      <div className="alert-header">
        <ChatRounded className="icon" />
        <h3>{messageAlert.payload.user}</h3>
      </div>
      <p className="alert-msg">{messageAlert.payload.msg}</p>
    </div>
  );
};

export default Alert;
