import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { NavLink } from "react-router-dom";

import { APP_URLS } from "../../constants/app.constants";
import styles from "./Header.css";

class NavMenu extends Component {
    componentWillUnmount() {
    }

    render() {
        const MenuList = [
            {
                btnText: "Dashboard",
                url: APP_URLS.DASHBOARD,
            },
            {
                btnText: "Show fridge",
                url: APP_URLS.FRIDGE_FOOD,
            },
            {
                btnText: "Add new meal",
                url: APP_URLS.ADD_MEAL,
            },
            {
                btnText: "Known food",
                url: APP_URLS.KNOWN_FOOD,
            },
        ];

        const MenuListDom = MenuList.map(item => (
          <NavLink to={item.url} key={item.btnText} activeClassName={styles.active}>
            <RaisedButton label={item.btnText} />
          </NavLink>
        ));

        return (
          <nav className={styles.header}>
            { MenuListDom }
          </nav>
        );
    }
}

export default NavMenu;
