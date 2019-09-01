import { combineReducers } from "redux";
import partnerReducer from "./PartnerReducer";

const rootReducer = combineReducers({
    partner: partnerReducer
})

export default rootReducer;