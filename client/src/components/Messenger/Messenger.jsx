import React from "react";
import { PeopleRounded, Comment, Send, Clear } from "@material-ui/icons";
import './styles.css';

const Messenger = () => {
  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Meeting Details</h3>
        <Clear className="icon" />
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
        <div className="chat-block">
          <div className="sender">
            you <small>10 PM</small>
          </div>
          <p className="msg">Here comes a actual msg</p>
        </div>
      </div>

      <div className="sent-msg-section">
        <input placeholder="Send a message to everyone" />
        <Send className="icon" />
      </div>
    </div>
  );
};

export default Messenger;
