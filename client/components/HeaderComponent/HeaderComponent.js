import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { NavLink } from "react-router-dom";

import { APP_URLS } from "../../constants/app.constants";
import styles from "./HeaderComponent.css";

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
                btnText: "Products",
                url: APP_URLS.PRODUCTS,
            },
            {
                btnText: "Dishes",
                url: APP_URLS.DISHES,
            },
            {
                btnText: "Add product",
                url: APP_URLS.ADD_PRODUCT,
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
