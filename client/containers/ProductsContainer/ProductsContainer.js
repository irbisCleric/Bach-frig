import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import ActionDelete from "material-ui/svg-icons/action/delete";
import { Link } from "react-router-dom";

import { APP_URLS } from "../../constants/app.constants";
import { getProducts, deleteProduct } from "../../actions/products.actions";
import style from "./ProductsContainer.css";

class ProductsContainer extends Component {
    constructor() {
        super();
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.props.handleGetProducts({ limit: 10 });
    }

    componentWillUnmount() {
    }

    handleRemove(e) {
        const keyProp = e.currentTarget.getAttribute("data-remove");
        this.props.handleRemoveProduct(keyProp);
    }

    render() {
        const { productsItems, isLoading } = this.props;

        let tBody;

        if (productsItems.length) {
            tBody = productsItems.map((food, index) => {
                const foodId = +index + 1;
                const routeProps = {
                    pathname: `${APP_URLS.PRODUCTS}/${foodId}`,
                    state: { productKey: food.key },
                };

                return (
                  <TableRow key={food.id}>
                    <TableRowColumn>{foodId}</TableRowColumn>
                    <TableRowColumn>
                      <Link to={routeProps}>
                        {food.name}
                      </Link>
                    </TableRowColumn>
                    <TableRowColumn>{food.amount}</TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        data-remove={food.key}
                        icon={<ActionDelete />}
                        onTouchTap={this.handleRemove}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
            });
        } else {
            tBody = (
              <TableRow>
                <TableRowColumn>
                  No food  :(
                </TableRowColumn>
              </TableRow>
             );
        }

        if (!isLoading) {
            const tConf = {
                rSel: false,
                displayCheckbox: false,
                dSelAll: false,
                adj: false,
            };

            return (
              <div className={style.ProductsContainer}>
                <MuiThemeProvider>
                  <Table selectable={tConf.rSel}>
                    <TableHeader displaySelectAll={tConf.dSelAll} adjustForCheckbox={tConf.adj}>
                      <TableRow>
                        <TableHeaderColumn>##</TableHeaderColumn>
                        <TableHeaderColumn>Food</TableHeaderColumn>
                        <TableHeaderColumn>Amount</TableHeaderColumn>
                        <TableHeaderColumn>Control buttons</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={tConf.displayCheckbox}>
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

ProductsContainer.propTypes = {
    productsItems: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            amount: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            name: PropTypes.string,
        }),
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleGetProducts: PropTypes.func.isRequired,
    handleRemoveProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { productsItems, isLoading } = state.main;
    return { productsItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handleGetProducts: bindActionCreators(getProducts, dispatch),
    handleRemoveProduct: bindActionCreators(deleteProduct, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
