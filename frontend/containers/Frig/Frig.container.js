import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import CircularProgress from "material-ui/CircularProgress";

import getFrigItems from "../../actions/frig.actions";

class FrigContainer extends Component {

    componentDidMount() {
        this.props.handleGetFrigItems({ limit: 10 });
    }

    componentWillUnmount() {
    }

    render() {
        const { frigItems, isLoading } = this.props;
        const tBody = frigItems.map(food => (
          <TableRow key={food.title}>
            <TableRowColumn>{food.title}</TableRowColumn>
            <TableRowColumn>{food.amount}</TableRowColumn>
          </TableRow>),
        );

        if (!isLoading) {
            return (<Table>
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

        return <CircularProgress />;
    }
}

FrigContainer.propTypes = {
    frigItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            amount: PropTypes.number,
        }),
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleGetFrigItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { frigItems, isLoading } = state.main;
    return { frigItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handleGetFrigItems: bindActionCreators(getFrigItems, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FrigContainer);
