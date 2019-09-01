import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCoursesSuccess(courses) {
	return {
		type: types.LOAD_COURSES_SUCCESS,
		courses: courses
	};
}

export function deleteCourseSuccess(course) {
	return {
		type: types.DELETE_COURSE_SUCCESS,
		course: course
	};
}

export function createCourseSuccessful(course) {
	return {
		type: types.CREATE_COURSE_SUCCESS,
		course: course
	};
}

export function updateCourseSuccessful(course) {
	return {
		type: types.UPDATE_COURSE_SUCCESS,
		course: course
	};
}

export function deleteCourseOptimistic(course){
	return {
		type: types.DELETE_COURSE_OPTIMISTIC,
		course: course
	}
}

export function loadCourses() {

	// return function (dispatch) { //redux thunk injects dispatch here so we don't have to
	// 	dispatch(beginApiCall());
	// 	return courseApi.getCourses().then(courses => {
	// 		dispatch(loadCoursesSuccess(courses));
	// 	}).catch(error => {
	// 		dispatch(apiCallError(error));
	// 		throw error;
	// 	}
	//
	// 	)
	// }
	console.log("Returning LOAD_COURSES action")
	return {
		type: types.LOAD_COURSES
	}
}

export function saveCourse(course) {
	return function (dispatch) { //redux thunk injects dispatch here so we don't have to
		dispatch(beginApiCall());
		return courseApi.saveCourse(course).then(savedCourse => {
			course.id
				? dispatch(updateCourseSuccessful(savedCourse))
				: dispatch(createCourseSuccessful(savedCourse));
		}).catch(error => {
			dispatch(apiCallError(error));
			throw error;
		}

		)
	}
}

export function deleteCourse(course) {
	return {
		type: types.DELETE_COURSE_OPTIMISTIC,
		course: course
	}
  // return function(dispatch) {
  //   // Doing optimistic delete, so not dispatching begin/end api call
  //   // actions, or apiCallError action since we're not showing the loading status for this.
  //   dispatch(deleteCourseOptimistic(course));
  //   return courseApi.deleteCourse(course.id);
  // };
}