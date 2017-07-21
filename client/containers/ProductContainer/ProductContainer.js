import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getProduct } from "../../actions/products.actions";

import styles from "./ProductContainer.css";

class ProductContainer extends Component {
    componentDidMount() {
        const { productKey } = this.props.location.state;
        this.props.handleGetProduct(productKey);
    }

    render() {
        const productId = this.props.match.params.number;
        let productName;
        let productAmount;

        if (this.props.product.length) {
            productName = this.props.product[0].name;
            productAmount = this.props.product[0].amount;
        }

        return (
            <div className="product">
                <h1 className="product_header">Single product page</h1>
                <img className={styles.product_img} src={`http://lorempixel.com/100/100/cats/${productId}`} alt="" />
                <div className={styles.product_name}>
                    Name: {productName} <br />
                    Amount: {productAmount}
                </div>
            </div>
        );
    }
}

ProductContainer.propTypes = {
    product: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            amount: PropTypes.number,
        }),
    ).isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            number: PropTypes.string,
        }),
    }).isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            productKey: PropTypes.string,
        }),
    }).isRequired,
    handleGetProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { product } = state.main;
    return { product };
};

const mapDispatchToProps = dispatch => ({
    handleGetProduct: bindActionCreators(getProduct, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
