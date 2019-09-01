import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConfigViewerPresentation from "./ConfigViewerPresentation";

function ConfigViewerContainer( props ) {

    return <ConfigViewerPresentation/>;
}

/*
  This injects the state used/supported by this container component into the props,
  to be passed down to the view

  The ownProps argument is a reference to the component's props, which we will use here
  to get the URL injected by ROuter.
*/
function mapStateToProps(state, ownProps) {

}

//this injects the actions supported by this container component into the props, to be passed down to the view
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigViewerContainer);
