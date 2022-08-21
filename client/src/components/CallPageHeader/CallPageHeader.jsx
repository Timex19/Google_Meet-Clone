import React from 'react';
import { PeopleRounded, ChatRounded, } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import './styles.css';

const CallPageHeader = () => {
    
    return (
        <div className="frame-header">
            <div className="header-items icon-block">
                <PeopleRounded />
            </div>
            <div className="header-items icon-block">
                <ChatRounded />
                <span className="alert-circle-icon"></span>
            </div>
            <div className="header-items date-block">12:00 PM</div>
            <div className="header-items icon-block">
                <Avatar className="header_avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rsSzLimlQyniEtUV4-1raljzFhS45QBeAw&usqp=CAU" />
            </div>
        </div>
    )
}

export default CallPageHeader;