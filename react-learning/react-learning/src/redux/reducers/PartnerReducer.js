import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/*
  With Redux, you will often use the spread operator, map, filter and reduce
  because of the need to handle immutable data at the store
  Notice that map, filter and reduce already return a new object when invoked
*/

export default function partnerReducer(state = initialState.partner, action) {
    switch (action.type) {
        case types.PARTNER_CREATE_PARTNER:
        case types.PARTNER_UPDATE_PARTNER:
            return { ...action.partner } ;
        case types.PARTNER_DELETE_PARTNER:
            return initialState.partner;
        default:
            return state;
        //nothing
    }
}
