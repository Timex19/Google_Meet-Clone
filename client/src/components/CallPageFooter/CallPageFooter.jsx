import React from "react";
import {
  KeyboardArrowUp,
  Mic,
  MicOff,
  Phone,
  Videocam,
  VideocamOff,
  ClosedCaption,
  DesktopMac,
} from "@material-ui/icons";
import "./styles.css";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  isVideo,
  toggleAudio,
  toggleVideo,
  disconnectCall,
}) => {
  return (
    <div className="footer-item">
      <div className="left-item">
        <div className="icon-block">
          Meeting details
          <KeyboardArrowUp className="icon" />
        </div>
      </div>
      <div className="center-item">
        <div
          className={`icon-block ${!isAudio ? "red-bg" : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          {isAudio ? <Mic className="icon" /> : <MicOff className="icon red-bg" />}
        </div>
        <div className="icon-block" onClick={disconnectCall}>
          <Phone className="icon red" />
        </div>
        <div
          className={`icon-block ${!isVideo ? "red-bg" : null}`}
          onClick={() => toggleVideo(!isVideo)}
        >
          {isVideo ? <Videocam className="icon" /> : <VideocamOff className="icon red-bg" />}
        </div>
      </div>
      <div className="right-item">
        <div className="icon-block">
          <ClosedCaption className="icon red" />
          <p className="title">Turn on captions</p>
        </div>
        {isPresenting ? (
          <div className="icon-block" onClick={stopScreenShare}>
            <DesktopMac className="icon red" />
            <p className="title">Stop presenting</p>
          </div>
        ) : (
          <div className="icon-block" onClick={screenShare}>
            <DesktopMac className="icon red" />
            <p className="title">Present now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPageFooter;
