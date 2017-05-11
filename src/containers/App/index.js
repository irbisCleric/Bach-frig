import React, { PropTypes } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavMenu from "../Menu/NavMenu.container";

function App(props) {
    return (
      <div>
        <header>
          <MuiThemeProvider>
            <NavMenu />
          </MuiThemeProvider>
        </header>
        {props.children}
      </div>
    );
}

App.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(React.PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default App;
