/* eslint prefer-template: "warn"*/
/* eslint quotes: ["warn", "double"]*/
/* eslint no-undef: "warn"*/
/* eslint no-unused-vars: "warn"*/

import React, {
    Component,
    // PropTypes,
} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";
import {
//     Switcher,
    Link,
//     Route,
} from "react-router-dom";

// import FoodItem from "../../containers/FoodItem";
import { APP_URLS } from "../../constants/app.constants";

require("./KnownFood.css");

// const Child = ({ match }) => (
//     <div>
//         <h3>ID: {match.params.id}</h3>
//     </div>
// );

// Child.propTypes = {
//     match: PropTypes.shape({
//         params: PropTypes.shape({
//             id: PropTypes.number,
//         }),
//     }).isRequired,
// };

class KnownFood extends Component {
    componentWillUnmount() {
    }

    render() {
        const tConf = {
            rSel: false,
            displayCheckbox: false,
            dSelAll: false,
            adj: false,
        };

        return (
            <MuiThemeProvider>
                <Table selectable={tConf.rSel}>
                    <TableHeader displaySelectAll={tConf.dSelAll} adjustForCheckbox={tConf.adj}>
                      <TableRow>
                        <TableHeaderColumn>Food name</TableHeaderColumn>
                        <TableHeaderColumn>Thumbnail</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={tConf.displayCheckbox}>
                        <TableRow key={Math.random()}>
                            <TableRowColumn>
                                <Link to={`${APP_URLS.KNOWN_FOOD}/1`}>
                                    Some food name
                                </Link>
                            </TableRowColumn>
                            <TableRowColumn>
                                <img src={"http://lorempixel.com/300/100/food/1"} alt="" />
                            </TableRowColumn>
                        </TableRow>
                        <TableRow key={Math.random()}>
                            <TableRowColumn>
                            <Link to={`${APP_URLS.KNOWN_FOOD}/2`}>
                                Some food name 2
                            </Link>
                            </TableRowColumn>
                            <TableRowColumn>
                                <img src={"http://lorempixel.com/300/100/food/2"} alt="" />
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>

                  </Table>
            </MuiThemeProvider>
        );
    }
}

export default KnownFood;
