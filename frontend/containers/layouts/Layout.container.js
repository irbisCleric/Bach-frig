import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

class Layout extends Component {
    render() {
        return (
            <div>hello</div>
        );
    }
}

Layout.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
