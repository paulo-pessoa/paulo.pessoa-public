import React from "react";
import {connect} from "react-redux";
import ReactJson from "react-json-view";

function ConfigViewerPresentation() {


    const jsonString = "{\"partner\": { \"identification\": { \"code\": \"GM\", \"displayName\": \"General Motors\"},\"searchCriteria\": { \"fields\": [\"customerId\", \"VIN\"]}}}";

    const jsonObject = JSON.parse(jsonString);

    return <ReactJson src={jsonObject} theme="monokai"/>;
}

function mapStateToProps(state)  {
    return {
        //this verifies is authors list has been returned so they can be weaved in the "merged result"
        config: state.courses.length + "blah"
    }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigViewerPresentation);