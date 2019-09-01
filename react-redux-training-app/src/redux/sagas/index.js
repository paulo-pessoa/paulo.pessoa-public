import { put, takeEvery, fork, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { loadCoursesSuccess, deleteCourseSuccess } from '../actions/courseActions';
import { loadAuthorsSuccess } from "../actions/authorActions";
import {  beginApiCall } from "../actions/apiStatusActions";
import { getCourses, deleteCourse } from "../../api/courseApi";
import { getAuthors } from "../../api/authorApi";

function* loadAuthors() {
    console.log("loading authors using saga");
    yield put(beginApiCall());
    try{
        let authors = yield getAuthors();
        yield put(loadAuthorsSuccess(authors));
    }catch(error){
        console.log('loadAuthors saga failed ', { error } );
    }
}

function* loadCourses() {
    console.log("Loading courses using saga");
    yield put(beginApiCall());
    try{
        let courses = yield getCourses();
        yield put(loadCoursesSuccess(courses));
    }catch(error){
        console.log('loadCourses saga failed ', { error } );
    }
}

function* deleteCourseSaga(action){
    // return function(dispatch) {
    //   // Doing optimistic delete, so not dispatching begin/end api call
    //   // actions, or apiCallError action since we're not showing the loading status for this.
    //   dispatch(deleteCourseOptimistic(course));
    //   return courseApi.deleteCourse(course.id);
    // };
    const course = action.course;
    console.log('Deleting course', {course}, ' using saga');
    if(action.course) {
        yield put(beginApiCall());
        yield deleteCourse(course.id);
        yield put(deleteCourseSuccess(course));
    }
}

function* watchLoadCourses() {
    console.log("watch LoadCourses");
    yield takeEvery(actionTypes.LOAD_COURSES, loadCourses);
}

function* watchLoadAuthors() {
    console.log("watch loadAuthors")
    yield takeEvery(actionTypes.LOAD_AUTHORS, loadAuthors);
}

function* watchDeleteCourse() {
    console.log("watch delete course")
    yield takeEvery(actionTypes.DELETE_COURSE_OPTIMISTIC, deleteCourseSaga);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoadCourses),
        fork(watchLoadAuthors),
        fork(watchDeleteCourse)
    ]);
}