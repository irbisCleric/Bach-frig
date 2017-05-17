import React, { Component, PropTypes } from "react";

class FoodItem extends Component {
    componentWillUnmount() {
    }

    render() {
        const { params } = this.props;

        return (
            <div>
                <h1>Single food page</h1>
                <span>{ params.food_id }</span>
            </div>
        );
    }
}

FoodItem.propTypes = {
    params: PropTypes.shape({
        food_id: PropTypes.number,
    }).isRequired,
};

export default FoodItem;
