import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppBar from "material-ui/AppBar";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";

import getFrigItems from "../../actions/frig.actions";

const DropdownMenu = (props) => {
    const disabledHelp = true;
    const moreItemsTouch = true;

    return (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton touch={moreItemsTouch}>
            <NavigationExpandMoreIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        targetOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          /* probably here should be triggerd handleGetFrigItems */
          primaryText="Check frig" onClick={getFrigItems}
        />
        <MenuItem primaryText="Help" disabled={disabledHelp} />
      </IconMenu>
    );
};

class ActionMenu extends Component {
    componentDidMount() {
    }

    render() {
        return (
          <AppBar
            title="Title"
            iconElementLeft={<DropdownMenu />}
          />
        );
    }
}

ActionMenu.propTypes = {
    handleGetFrigItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { frigItems, isLoading } = state.main;
    return { frigItems, isLoading };
};

const mapDispatchToProps = dispatch => ({
    handleGetFrigItems: bindActionCreators(getFrigItems, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionMenu);
