import React, { PropTypes } from "react";

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

App.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(React.PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default App;
