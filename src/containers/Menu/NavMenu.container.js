import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { NavLink } from "react-router-dom";
import styles from "./NavMenu.css";

class NavMenu extends Component {
    componentWillUnmount() {
    }

    render() {
        const MenuList = [
            {
                btnText: "Homepage",
                url: "/home",
            },
            {
                btnText: "Add new meal",
                url: "/add_meal",
            },
            {
                btnText: "Show fridge",
                url: "/fridge_food",
            },
        ];

        const MenuListDom = MenuList.map(item => (
          <NavLink to={item.url} key={item.btnText} activeClassName={styles.active}>
            <RaisedButton label={item.btnText} />
          </NavLink>
        ));

        return (
          <div>
            { MenuListDom }
          </div>
        );
    }
}

export default NavMenu;
