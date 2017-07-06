import React, { PropTypes } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "../../components/HeaderComponent";
import styles from "./CoreLayout.css";

export const CoreLayout = ({ children }) => (
    <div className={styles.container}>
        <MuiThemeProvider>
          <Header />
        </MuiThemeProvider>
        {children}
    </div>
);

CoreLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default CoreLayout;
