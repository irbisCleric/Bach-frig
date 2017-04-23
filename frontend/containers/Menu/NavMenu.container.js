import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

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
          <Link to={item.url} key={item.btnText}>
            <RaisedButton label={item.btnText} />
          </Link>
        ));

        return (
          <div>
            { MenuListDom }
          </div>
        );
    }
}

export default NavMenu;
