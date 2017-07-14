import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from "material-ui/Table";
import { Link } from "react-router-dom";

import { APP_URLS } from "../../constants/app.constants";

import "./DishesContainer.css";

class Dishes extends Component {
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
                                <Link to={`${APP_URLS.DISHES}/1`}>
                                    Some food name
                                </Link>
                            </TableRowColumn>
                            <TableRowColumn>
                                <img src={"http://lorempixel.com/300/100/cats/1"} alt="" />
                            </TableRowColumn>
                        </TableRow>
                        <TableRow key={Math.random()}>
                            <TableRowColumn>
                            <Link to={`${APP_URLS.DISHES}/2`}>
                                Some food name 2
                            </Link>
                            </TableRowColumn>
                            <TableRowColumn>
                                <img src={"http://lorempixel.com/300/100/cats/2"} alt="" />
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>

                  </Table>
            </MuiThemeProvider>
        );
    }
}

export default Dishes;
