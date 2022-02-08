import React, { useEffect } from "react";
import { Container, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { attemptRefresh } from "./actions/user";
import Modal from "./components/Modal/Modal";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2b2d42",
        light: "rgba(43, 45, 66, 0.3)",
      },
      secondary: {
        main: "#d90429",
      },
      background: {
        main: "#edf2f4",
      },
      gray: {
        main: "#8d99ae",
      },
    },
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptRefresh());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="lg">
          {user ? <Home /> : <Auth />}
          {/* <Switch>
            <Route path="/" exact component={Auth} />
            <Route path="/home" exact component={Home} />
          </Switch> */}
          <Modal />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
