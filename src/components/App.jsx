import React from "react";
import { Router } from "react-router-dom";
import { history } from "../history";
import { connect } from "react-redux";
import { checkLogin } from "../actions";
import LeftSideMenu from "./LeftSideMenu";
import Routes from "./routes";
import { CheckLogin } from "./hooks";

import "./App.css";

const App = props => {
  CheckLogin(props.checkLogin);

  return (
    <div className="app">
      <Router history={history}>
        <React.Fragment>
          <LeftSideMenu />
          <Routes />
        </React.Fragment>
      </Router>
    </div>
  );
};

export default connect(
  null,
  { checkLogin }
)(App);
