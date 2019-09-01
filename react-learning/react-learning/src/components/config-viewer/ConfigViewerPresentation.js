import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ReactJson from "react-json-view";
import {updatePartner} from "../../redux/actions/PartnerActionCreator";
import {Button} from "react-bootstrap";

function ConfigViewerPresentation({dispatchUpdatePartner, ...props}) {

    const initialState = {
        identification:
            {code: "GM", displayName: "General Motors"},
        searchRule: {
            fields: ["customerId", "VIN"]
        }
    };

    const [partnerObject, setPartnerObject] = useState(initialState);
    const [saving, setSaving] = useState(false);
    const [pristine, setPristine] = useState(true);

    useEffect(() => {
        console.log("config changed");
    }, [saving, pristine]);

    const handleAdd = (object) => {
        console.log("adding ", object);
        setPristine(false);
        setPartnerObject(object.updated_src);
    };

    const handleEdit = (object) => {
        console.log("editing ", object);
        setPristine(false);
        setPartnerObject(object.updated_src);
    };

    const handleDelete = (object) => {
        console.log("deleting ", object);
        setPristine(false);
        setPartnerObject(object.updated_src);
    };

    const handleSave = (() => {
        setSaving(true);
        dispatchUpdatePartner(partnerObject);
        setSaving(false);
        setPristine(true);
    })

    return (
        <>
            <ReactJson
                hideRoote={true}
                src={partnerObject}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                enableClipboard={true}
                name={"Partner"}
            />

            <Button variant="outline-primary" onClick={handleSave} disabled={(pristine || saving)}>
                {saving ? "Saving..." : "Save"}
            </Button>
        </>
    );
}

function mapStateToProps(state) {
    return {}
};

const mapDispatchToProps = {
    dispatchUpdatePartner: updatePartner
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigViewerPresentation);