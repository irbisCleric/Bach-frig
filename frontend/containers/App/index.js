import React from "react";
// import React, { Component } from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import style from "./App.css";

import FrigContainer from "./../Frig/Frig.container";

function App() {
    return (
      <MuiThemeProvider>
        <div className={style.MainContainer}>
          <div className={style.LeftColumn}>
            <FrigContainer />
          </div>
        </div>
      </MuiThemeProvider>
    );
}

export default App;
