import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { setFrigItem } from "../../actions/frig.actions";

class FormAddingMeal extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('submimt');
        this.props.handleSetFrigItem('new item');
    }

    render() {
        return (
          <MuiThemeProvider>
            <form onSubmit={this.handleSubmit}>
              <h3>Add meal</h3>
              <div>
                <label htmlFor="name">
                  <div>Please enter name of the product</div>
                  <input type="text" name="name" />
                </label>
              </div>
            </form>
          </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    const { frigItems, isLoading } = state.main;
    return { frigItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handleSetFrigItem: bindActionCreators(setFrigItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddingMeal);