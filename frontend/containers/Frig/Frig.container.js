import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFrigItems } from '../../actions/frig.actions';
// import apiActions from '../../actions/api.actions';
// import pTypes from '../../actions/types/pokeball.types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";


class PokemonsContainer extends Component {

    componentDidMount() {
        this.props.handleGetFrigItems({ limit: 10 });
    }

    componentWillUnmount() {
        // this.props.handleClearApiState(pTypes.GET_POKEMONS);

        this.props.handleClearDataState();
    }

    render() {
        const { frigItems } = this.props;
        const tBody = frigItems.map(food => (
            <TableRow key={food.title}>
                <TableRowColumn>{food.title}</TableRowColumn>
                <TableRowColumn>{food.amount}</TableRowColumn>
            </TableRow>
            ),
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

PokemonsContainer.propTypes = {
    // handleClearApiState: PropTypes.func,
};

const mapStateToProps = (state) => ({
    frigItems: state.main.frigItems,
});

const mapDispatchToProps = (dispatch) => ({
    handleGetFrigItems: bindActionCreators(getFrigItems, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsContainer);