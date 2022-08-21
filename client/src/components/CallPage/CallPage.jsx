import React from "react";
import { CallPageHeader, CallPageFooter, MeetingInfo, Messenger } from '../../components';
import "./styles.css";

const CallPage = () => {
    return (
        <div className="callpage-container">
            <video className="video-container" src="" controls></video>

            <CallPageHeader />
            <CallPageFooter />
            <MeetingInfo />
            <Messenger />
        </div>
    )
}

export default CallPage;