import React, { useState } from "react";
import { PeopleRounded, Comment, Send, Clear } from "@material-ui/icons";
import "./styles.css";
import { formatDate } from "./../../utils/helpers";

const Messenger = ({ setIsMessenger, sendMsg, messageList }) => {
  const [msg, setMsg] = useState("");

  const handleChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = () => {
    sendMsg(msg);
    setMsg("");
  };

  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Meeting Details</h3>
        <Clear
          className="icon"
          onClick={() => {
            setIsMessenger(false);
          }}
        />
      </div>

      <div className="messenger-header-tabs">
        <div className="tab">
          <PeopleRounded className="icon" />
          <p>People (1)</p>
        </div>
        <div className="tab active">
          <Comment className="icon active" />
          <p>Chat</p>
        </div>
      </div>

      <div className="chat-section">
        {messageList.map((item) => (
          <div key={item.time} className="chat-block">
            <div className="sender">
              {item.user} <small>{formatDate(item.time)}</small>
            </div>
            <p className="msg">{item.msg}</p>
          </div>
        ))}
      </div>

      <div className="sent-msg-section">
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={(e) => handleChangeMsg(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Send className="icon" onClick={handleSendMsg} />
      </div>
    </div>
  );
};

export default Messenger;
