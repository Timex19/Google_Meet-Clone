import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { auth } from "../../lib/firebase";
import Signup from "../Signup/Signup";
import "./styles.css";

const errorIntialVlaue = { state: false, msg: "" };

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState(errorIntialVlaue);
  const [emailError, setEmailError] = useState(errorIntialVlaue);

  const toggleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setShowSignUp(true);
      setLoading(false);
    }, 1500);
  };

  const signin = (e) => {
    e.preventDefault();

    setLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setPasswordError(errorIntialVlaue);
        setEmailError(errorIntialVlaue);
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setEmailError(errorIntialVlaue);
          setPasswordError({ state: true, msg: "Incorrect password" });
        } else if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          setEmailError({ state: true, msg: "Email Dosen't exsist" });
          setPasswordError(errorIntialVlaue);
        }
        setLoading(false);
      });
  };
  return (
    <div className="login ">
      {showSignUp ? (
        <Signup setShowSignUp={setShowSignUp} />
      ) : (
        <>
          <div className="login__content">
            {loading && <div className="login__loading" />}
            <div
              className="login__wrapper"
              style={{
                opacity: loading ? "0.5" : "1",
              }}
            >
              <img
                className="login__logo"
                src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
                alt="Google"
              />

              <p className="login__title">Sign in</p>
              <p className="login__subtitle">Continue to Gmail</p>

              <form className="login__form">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  className="login__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError.state}
                  helperText={emailError.msg}
                />

                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  className="login__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={passwordError.state}
                  helperText={passwordError.msg}
                />

                <div className="login__infoText">
                  Not your computer? Use guest mode to signin privately
                  <a href="/">Learn More</a>
                </div>

                <div className="login__buttons">
                  <Button
                    className="login__button"
                    color="primary"
                    onClick={toggleSignUp}
                  >
                    Create Account
                  </Button>

                  <Button
                    className="login__button"
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={signin}
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
