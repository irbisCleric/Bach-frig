import React, { Component } from "react";
import { bindActionCreators } from "redux"
import { connect } from "react-redux";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Frig extends Component {
    render() {
        const FoodInFrig = () => (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Food</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableRowColumn>Meat</TableRowColumn>
                        <TableRowColumn>2</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Chicken</TableRowColumn>
                        <TableRowColumn>3</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Tomato</TableRowColumn>
                        <TableRowColumn>1</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );

        return (
            <FoodInFrig/>
        );
    }
}

class CheckFrig extends Component {
    render() {
        const btnText = "Check frig";

        return (
            <RaisedButton
                label={btnText}
                primary={true}
                icon={<ActionAndroid />}
            />
        );
        
    }
}

class App extends Component {
    render() {
        // return (
        //     <MuiThemeProvider>
        //         <CheckFrig/>
        //         <Frig/>
        //     </MuiThemeProvider>
        // );
        return (
            <MuiThemeProvider>
                <Frig/>
            </MuiThemeProvider>
        );
    }
}

export default App;