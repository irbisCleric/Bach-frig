import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import Snackbar from "material-ui/Snackbar";

import { setProduct } from "../../actions/products.actions";
import { APP_URLS } from "../../constants/app.constants";

const EMPTY_ITEM = { name: "", amount: 0 };

class AddProductContainer extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            item: { ...EMPTY_ITEM },
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSetProduct({
            ...this.state.item,
            amount: +this.state.item.amount,
        });
        this.setState({ item: { ...EMPTY_ITEM } });
        this.handleClose();
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
        this.props.history.push(APP_URLS.FOOD);
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
        const flatButtonPrimary = true;
        const flatButtonKeyboardFocused = true;
        const errorText = {
            required: "This field is required",
        };

        const { productAdded, msg } = this.props;

        /** Buttons in sumbit popup */
        const ActionButtons = [
            <FlatButton
              label="Cancel"
              primary={flatButtonPrimary}
              onTouchTap={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={flatButtonPrimary}
              keyboardFocused={flatButtonKeyboardFocused}
              onTouchTap={this.handleSubmit}
            />,
        ];

        /** Submit popup */
        const ConfirmDialog = () => (
            <Dialog
              title="Please confirm that you want to add current product"
              actions={ActionButtons}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
            Click on Submit button if data is corect
           </Dialog>
        );

        return (
          <MuiThemeProvider>
            <div>
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
                    onTouchTap={this.handleOpen}
                  />
                </Paper>
              </form>
              <ConfirmDialog />
              <Snackbar
                open={productAdded}
                message={msg}
                autoHideDuration={2000}
              />
            </div>
          </MuiThemeProvider>
        );
    }
}


AddProductContainer.propTypes = {
    handleSetProduct: PropTypes.func.isRequired,
    history: PropTypes.shape({
        action: PropTypes.string.isRequired,
        block: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired,
        go: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
        goForward: PropTypes.func.isRequired,
        length: PropTypes.number.isRequired,
        listen: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
    }).isRequired,
    productAdded: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    const { productsItems, productAdded, msg } = state.main;
    return { productsItems, productAdded, msg };
};

const mapDispatchToProps = dispatch => ({
    handleSetProduct: bindActionCreators(setProduct, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProductContainer);
