import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/*
  With Redux, you will often use the spread operator, map, filter and reduce
  because of the need to handle immutable data at the store
  Notice that map, filter and reduce already return a new object when invoked
*/

export default function courseReducer(state = initialState.courses, action) {
	switch (action.type) {
		case types.CREATE_COURSE_SUCCESS:
			// debugger;
			return [...state, { ...action.course }];
		case types.UPDATE_COURSE_SUCCESS:
			return state.map(course => course.id === action.course.id ? action.course : course);
		case types.LOAD_COURSES_SUCCESS:
			return action.courses;
		case types.DELETE_COURSE_SUCCESS:
			return state.filter(course => course.id !== action.course.id);
		case "LOADED":
			console.log("Reducer will sleep");
			sleep(1);
			console.log("Reducer loaded");
			return state;
		default:
			return state;
		//nothing
	}
}

function sleep(delay) {
	let start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}