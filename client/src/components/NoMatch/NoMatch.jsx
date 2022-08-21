import React from "react";
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import "./styles.css";

const NoMatch = () => {
    return (
        <div className="no-match">
            <Header />
            <div className="no-match__content">
                <h2>Invalid video call name.</h2>
                <div className="action-btn">
                    <Link className="btn green" to="/">
                        Return to home screen
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NoMatch;