import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";

class NavMenu extends Component {
    componentWillUnmount() {
    }

    render() {
        function Homepage() {
            const btnText = "Homepage";
            const url = "#/app";

            return (
              <RaisedButton
                href={url}
                label={btnText}
              />
            );
        }

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

        return (
          <div>
            <Homepage />
            <AddNewMeal />
          </div>
        );
    }
}

export default NavMenu;
