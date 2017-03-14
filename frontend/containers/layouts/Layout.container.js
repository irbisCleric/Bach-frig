import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

function Layout() {
    return (<div>hello</div>);
}

Layout.propTypes = {
};

const mapStateToProps = (/* state */) => ({
});

const mapDispatchToProps = (/* dispatch*/) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
