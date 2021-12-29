import React, { useState } from "react";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import ShieldIcon from "@mui/icons-material/Shield";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import logoWhiteBG from "../../images/logoWhiteBG.png";
import { getUser } from "../../actions/user.js";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import useStyles from "./styles";

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    if (email === "gregmeyers@gmail.com" && password === "BattleIM") {
      history.push("/home");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.imgContainer}>
        <img src={logoWhiteBG} className={classes.logo} />
      </div>
      <Paper className={classes.paper} elevation={3}>
        <Container>
          <Typography variant="subtitle1" className={classes.heading}>
            Sign in to your account
          </Typography>
          <form className={classes.form} action="/">
            <div className={classes.inputContainer}>
              <label for="email" className={classes.label}>
                Email
              </label>
              <input
                name="email"
                id="email"
                className={classes.input}
                onChange={handleEmailChange}
              />
            </div>
            <div className={classes.inputContainer}>
              <div className={classes.passwordLabelRow}>
                <label for="password" className={classes.label}>
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
                onChange={handlePasswordChange}
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
          <Button
            variant="text"
            color="primary"
            fullWidth
            className={classes.continueButton}
          >
            Use single sign-on (SSO) instead
          </Button>
        </Container>
      </Paper>
    </Container>
  );
};

export default Auth;
