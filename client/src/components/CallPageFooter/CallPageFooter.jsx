import React from 'react';
import { KeyboardArrowUp, Mic, MicOff, Phone, Videocam, VideocamOff, ClosedCaption, DesktopMac } from "@material-ui/icons";
import './styles.css';

const CallPageFooter = () => {
    
    return (
        <div className="footer-item">
            <div className="left-item">
                <div className="icon-block">
                    Meeting details
                    <KeyboardArrowUp className="icon" />
                </div>
            </div>
            <div className="center-item">
                <div className="icon-block">
                    <Mic className="icon" />
                </div>
                <div className="icon-block">
                    <Phone className="icon red" />
                </div>
                <div className="icon-block">
                    <Videocam className="icon" />
                </div>
            </div>
            <div className="right-item">
                <div className="icon-block">
                    <ClosedCaption className="icon red" />
                    <p className="title">Turn on captions</p>
                </div>
                <div className="icon-block">
                    <DesktopMac className="icon red" />
                    <p className="title">Present now</p>
                </div>
            </div>
        </div>
    )
}

export default CallPageFooter;