import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider, InputAdornment, TextField } from "@material-ui/core";
import { Keyboard, VideoCallOutlined } from "@material-ui/icons";
import shortid from "shortid";
import "./styles.css";

const Home = () => {

  const history = useHistory();

  const startCall = () => {
    // generate a unique id for user
    const uid = shortid.generate();
    // user will be redirected to the call page
    history.push(`/${uid}#init`);
  }

  return (
    <div className="hero">
      <div className="hero__left">
        <div className="hero__featureText">
          <h1 className="hero__title">
            Premium video meetings. Now free for everyone
          </h1>
          <p className="hero__subtitle">
            We re-engineered the service we built for secure buisness meetings,
            Google Meet, to make sure it free and available for all.
          </p>
        </div>

        <div className="hero__buttons">
          <Button
            color="primary"
            variant="contained"
            className="hero__createBTN"
            onClick={startCall}
          >
            <VideoCallOutlined />
            <p>New Meeting</p>
          </Button>

          <TextField
            className="hero__input"
            variant="outlined"
            placeholder="Enter a code or a link"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Keyboard className="icon" />
                </InputAdornment>
              ),
            }}
          />

          <Button className="hero__joinBTN">Join</Button>
        </div>

        <Divider />

        <p className="hero__learnMore">
          <a href="https://meet.google.com/about/redirect/landing-learn-more/?hl=en" target="_blank" rel="noreferrer">
            Learn more&nbsp;
          </a> 
          about Google Meet
        </p>
      </div>

      <div className="hero__right">
        <img
          className="hero__image"
          src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
          alt="Feature"
        />
      </div>
    </div>
  );
};

export default Home;
