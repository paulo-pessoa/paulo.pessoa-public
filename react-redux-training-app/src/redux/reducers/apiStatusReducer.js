import * as types from "../actions/actionTypes";
import initialState from "./initialState";


function actionTypesEndsInSuccess(type){
	return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
	if(action.type == types.BEGIN_API_CALL){
        return state + 1;
	} else if (action.type === types.API_CALL_ERROR || actionTypesEndsInSuccess(action.type)) { // this is a result of the convention used in action types
        return state - 1;
	}
	return state;
}