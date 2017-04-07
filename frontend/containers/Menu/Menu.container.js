import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import ActionAndroid from "material-ui/svg-icons/action/android";

import style from "./Menu.css";

class MenuContainer extends Component {
    componentWillUnmount() {
    }

    render() {
        function AddNewMeal() {
            const btnText = "Add new meal";
            const url = "#/add_meal";

            return (
              <RaisedButton
                href={url}
                label={btnText}
              />
            );
        }

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

        return (
          <div className={style.MenuContainer}>
            <CheckFrig />
            <AddNewMeal />
          </div>
        );
    }
}

export default MenuContainer;
