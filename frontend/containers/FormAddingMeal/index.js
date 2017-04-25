import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { setFridgeItem } from "../../actions/fridge.actions";

class FormAddingMeal extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            item: { name: "", amount: "" },
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        this.props.handlesetFridgeItem("new item");
    }

    handleChange({ target: { name, value } }) {
        this.setState({
            item: {
                ...this.state.item,
                [name]: value,
            },
        });
    }

    render() {
        const stylePaper = {
            height: 250,
            marginTop: 20,
            padding: 20,
            display: "inline-block",
        };
        const submitBtnPrimary = true;
        const errorText = {
            required: "This field is required",
        };

        return (
          <MuiThemeProvider>
            <form>
              <Paper style={stylePaper} zDepth={3}>
                <label htmlFor="name">
                  <TextField
                    placeholder="Enter the meal name"
                    name="name"
                    value={this.state.item.title}
                    onChange={this.handleChange}
                    errorText={this.state.item.name ? "" : errorText.required}
                  />
                </label><br />
                <label htmlFor="amount">
                  <TextField
                    hintText="How many items have you bought?"
                    name="amount"
                    onChange={this.handleChange}
                    errorText={this.state.item.amount ? "" : errorText.required}
                  />
                </label><br /><br />
                <RaisedButton
                  disabled={!this.state.item.name || !this.state.item.amount}
                  label="Submit"
                  primary={submitBtnPrimary}
                  onTouchTap={this.handleSubmit}
                />
              </Paper>
            </form>
          </MuiThemeProvider>
        );
    }
}


FormAddingMeal.propTypes = {
    handlesetFridgeItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { fridgeItems, isLoading } = state.main;
    return { fridgeItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handlesetFridgeItem: bindActionCreators(setFridgeItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAddingMeal);
