import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { getFridgeItems } from "../../actions/fridge.actions";
import style from "./Fridge.css";

class FridgeContainer extends Component {

    componentDidMount() {
        this.props.handlegetFridgeItems({ limit: 10 });
    }

    componentWillUnmount() {
    }

    render() {
        const { fridgeItems, isLoading } = this.props;
        const tBody = fridgeItems.map(food => (
          <TableRow key={food.title}>
            <TableRowColumn>{food.title}</TableRowColumn>
            <TableRowColumn>{food.amount}</TableRowColumn>
          </TableRow>),
        );

        if (!isLoading) {
            return (
              <div className={style.FridgeContainer}>
                <MuiThemeProvider>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>Food</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      { tBody }
                    </TableBody>
                  </Table>
                </MuiThemeProvider>
              </div>);
        }

        return (
          <MuiThemeProvider>
            <CircularProgress />
          </MuiThemeProvider>
        );
    }
}

FridgeContainer.propTypes = {
    fridgeItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            amount: PropTypes.number,
        }),
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    handlegetFridgeItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { fridgeItems, isLoading } = state.main;
    return { fridgeItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handlegetFridgeItems: bindActionCreators(getFridgeItems, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeContainer);
