import React, { Component, PropTypes } from "react";

class ProductContainer extends Component {
    componentWillUnmount() {
    }

    render() {
        const { params } = this.props;

        return (
            <div>
                <h1>Single food page</h1>
                <span>{ params.dish_id }</span>
            </div>
        );
    }
}

ProductContainer.propTypes = {
    params: PropTypes.shape({
        dish_id: PropTypes.number,
    }).isRequired,
};

export default ProductContainer;
