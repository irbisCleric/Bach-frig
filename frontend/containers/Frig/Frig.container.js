import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";

import { getFrigItems } from "../../actions/frig.actions";

class FrigContainer extends Component {

    componentDidMount() {
        this.props.handleGetFrigItems({ limit: 10 });
    }

    componentWillUnmount() {
    }

    render() {
        const { frigItems } = this.props;
        const tBody = frigItems.map(food => (
          <TableRow key={food.title}>
            <TableRowColumn>{food.title}</TableRowColumn>
            <TableRowColumn>{food.amount}</TableRowColumn>
          </TableRow>),
        );

        return (
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
          </Table>);
    }
}

FrigContainer.propTypes = {
    frigItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            amount: PropTypes.number,
        }),
    ).isRequired,
    handleGetFrigItems: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    frigItems: state.main.frigItems,
});

const mapDispatchToProps = dispatch => ({
    handleGetFrigItems: bindActionCreators(getFrigItems, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrigContainer);
