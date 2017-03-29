import React from "react";
// import React, { Component } from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import ActionAndroid from "material-ui/svg-icons/action/android";
import CircularProgress from "material-ui/CircularProgress";

import style from "./style.css";

import FrigContainer from "./../Frig/Frig.container";

function CheckFrig() {
    const btnText = "Check frig";
    const btnIsPrimary = true;

    return (
      <RaisedButton
        label={btnText}
        primary={btnIsPrimary}
        icon={<ActionAndroid />}
      />
    );
}

function App() {
    return (
      <MuiThemeProvider>
        <div className={style.MainContainer}>
          <div className={style.RightColumn}>
            <CheckFrig />
          </div>
          <div className={style.LeftColumn}>
            <CircularProgress />
            <FrigContainer />
          </div>
        </div>
      </MuiThemeProvider>
    );
}

export default App;
