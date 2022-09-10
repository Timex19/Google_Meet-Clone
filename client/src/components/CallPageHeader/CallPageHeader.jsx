import React, { useState, useEffect } from "react";
import { PeopleRounded, ChatRounded } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import "./styles.css";
import { formatDate } from "./../../utils/helpers";

const CallPageHeader = ({
  isMessenger,
  messageAlert,
  setMessageAlert,
  setIsMessenger,
}) => {
  const [interval, setInterval] = useState(null);
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [interval]);

  return (
    <div className="frame-header">
      <div className="header-items icon-block">
        <PeopleRounded />
      </div>
      <div
        className="header-items icon-block"
        onClick={() => {
          setIsMessenger(true);
          setMessageAlert({});
        }}
      >
        <ChatRounded />
        {!isMessenger && messageAlert.alert && (
          <span className="alert-circle-icon"></span>
        )}
      </div>
      <div className="header-items date-block">{currentTime}</div>
      <div className="header-items icon-block">
        <Avatar
          className="header_avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rsSzLimlQyniEtUV4-1raljzFhS45QBeAw&usqp=CAU"
        />
      </div>
    </div>
  );
};

export default CallPageHeader;
