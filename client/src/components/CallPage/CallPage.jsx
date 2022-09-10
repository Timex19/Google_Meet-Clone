import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getRequest, postRequest } from "./../../utils/apiRequests";
import {
  BASE_URL,
  GET_CALL_ID,
  SAVE_CALL_ID,
} from "./../../utils/apiEndpoints";
import io from "socket.io-client";
import {
  CallPageHeader,
  CallPageFooter,
  MeetingInfo,
  Messenger,
  Alert,
} from "../../components";
import MessageListReducer from "./../../reducers/MessageListReducer";
import Peer from "simple-peer";

import "./styles.css";

let peer = null;
const socket = io.connect(process.env.REACT_APP_BASE_URL);
const initialState = [];

const CallPage = () => {
  const history = useHistory();
  let { id } = useParams();
  const isAdmin = window.location.hash === "#init" ? true : false;
  const url = `${window.origin}${window.location.pathname}`;

  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );

  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
    }
    initWebRTC();
    socket.on("code", (data) => {
      if (data.url === url) {
        peer.signal(data.code);
      }
    })
  }, []);

  const getReceiverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    if (response.code) {
      peer.signal(response.code);
    }
  };

  const initWebRTC = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setStreamObj(stream);

        peer = new Peer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });

        if (!isAdmin) {
          getReceiverCode();
        }

        peer.on("signal", async (data) => {
          if (isAdmin) {
            let payload = {
              id,
              signalData: data,
            };
            await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
          } else {
            socket.emit("code", { code: data, url }, (cbData) => {
              console.log("code sent");
            });
          }
        });

        peer.on("connect", () => {
          console.log("peer connected");
        });
        
        peer.on("stream", (stream) => {
          let video = document.querySelector("video");

          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }

          video.play();
        });
      })
      .catch(() => {
        console.log("error");
      });
  };

  const sendMsg = (msg) => {
    peer.send(msg);
    messageListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
          );
        };
        setIsPresenting(true);
      });
  };

  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach((track) => {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };

  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };

  const toggleVideo = (value) => {
    streamObj.getVideoTracks()[0].enabled = value;
    setIsVideo(value);
  };

  const disconnectCall = () => {
    peer.destroy();
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="callpage-container">
      <video className="video-container" src="" controls></video>

      <CallPageHeader
        isMessenger={isMessenger}
        setIsMessenger={setIsMessenger}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      <CallPageFooter
        isPresenting={isPresenting}
        stopScreenShare={stopScreenShare}
        screenShare={screenShare}
        isAudio={isAudio}
        isVideo={isVideo}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        disconnectCall={disconnectCall}
      />
      {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}
      {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )}
    </div>
  );
};

export default CallPage;
