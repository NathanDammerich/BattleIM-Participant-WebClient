import React, { useState } from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";

import Icon from "./icon.js";
import { signin } from "../../actions/user";
import { googleAuthSuccess } from "../../actions/user";
import logoWhiteBG from "../../images/logoWhiteBG.png";
import useStyles from "./styles";

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();

    dispatch(
      signin(
        {
          email: email,
          password: password,
        },
        history
      )
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const googleSuccess = async (res) => {
    console.log("google success");
    dispatch(googleAuthSuccess(res.tokenId));
    console.log(res.profileObj);
    console.log(res.tokenId);
    console.log(res);
  };

  const googleFailure = (err) => {
    console.log("google failure");
    console.log(err);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={logoWhiteBG} className={classes.logo} alt="logo" />
      </div>
      <Paper className={classes.paper} elevation={3}>
        <Container>
          <Typography variant="subtitle1" className={classes.heading}>
            Sign in to your account
          </Typography>
          <form className={classes.form} action="/" onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
              <label htmlFor="email" className={classes.label}>
                Email
              </label>
              <input
                name="email"
                id="email"
                className={classes.input}
                onChange={handleEmailChange}
                autoComplete="off"
              />
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.passwordLabelRow}>
                <label htmlFor="password" className={classes.label}>
                  Password
                </label>
                <p className={classes.label}>Forgot your password?</p>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                color="secondary"
                className={classes.input}
                autoComplete="off"
                onChange={handlePasswordChange}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.continueButton}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </form>
          <GoogleLogin
            clientId="451600223630-o1sf43rnm26bg390ebu6ft3190edkdar.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Sign In With Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </Container>
      </Paper>
    </Container>
  );
};

export default Auth;
