import React from "react";
import { FileCopy, Clear, Security, Person } from "@material-ui/icons";
import { useAppContext } from "../../context/appContext";
import "./styles.css";

const MeetingInfo = () => {
  const { currentUser } = useAppContext();

  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>Your meeting's ready</h3>
        <Clear className="icon" />
      </div>
      <button className="add-people-btn">
        <Person className="icon" />
        Add Others
      </button>
      <p className="info-text">
        Or share this meeting link with others you want in the meeting
      </p>
      <div className="meeting-link">
        <span>Some random URL</span>
        <FileCopy className="icon" />
      </div>
      <div className="permission-text">
        <Security className="icon" />
        <p className="small-text">
          People who use this meeting link must get your permission before they
          can join.
        </p>
      </div>
      <p className="small-text">Joined as {currentUser?.email}</p>
    </div>
  );
};

export default MeetingInfo;
