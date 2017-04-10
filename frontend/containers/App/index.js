import React from "react";
// import React, { Component } from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";

// TODO move navigation here
function App(props) {
    return (
      <div>   
        <header>
          <nav>I am navigation.</nav>
        </header>      
        {props.children}
      </div> 
    );
}

export default App;
