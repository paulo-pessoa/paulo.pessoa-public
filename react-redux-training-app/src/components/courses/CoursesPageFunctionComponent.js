import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import { loadCourses, deleteCourseOptimistic } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";

import propTypes from "prop-types";
import CourseList from "./CourseList";
import {Redirect} from "react-router-dom";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify";

function CoursesPageFunctionComponent({courses, authors, loading, dispatchLoadCourses, dispatchLoadAuthors, dispatchDeleteCourse, ...props}) { // de constructing props

    const [redirectToAddCoursePage, setRedirectToAddCoursesPage] = useState(false);

    useEffect(() => {
        console.log(courses, authors, loading);
        if (courses.length === 0) {
            dispatchLoadCourses();
        }
        if (authors.length === 0) {
            dispatchLoadAuthors();
        }
    }, [props.courses, props.authors, props.loading]);

    /**
     * async and await are used here as an example of an alternaive way of handling asynhronous interactions
     */
    async function handleDeleteCourse(course) {
        toast.success("Course deleted");
        // try {
        //     await deleteCourse(course);
        // } catch (error) {
        //     toast.error("Delete failed. " + error.message, {autoClose: false});
        // }
        dispatchDeleteCourse(course);
    }

    let dateLocal = new Date("2018-08-08 21:00:00");
    console.log(dateLocal);
    console.log(dateLocal.getTime());

    return (
        <>
            {redirectToAddCoursePage && <Redirect to="/course"/>}
            <h2>Courses</h2>
            {loading ?
                <Spinner/> : (
                    <>
                        <button
                            style={{marginBottom: 20}}
                            className="btn btn-primary add-course"
                            onClick={() => setRedirectToAddCoursesPage(true)}
                        >
                            Add Course
                        </button>
                        <CourseList onDeleteClick={handleDeleteCourse} courses={courses}/>
                    </>
                )
            }
        </>
    );
}

CoursesPageFunctionComponent.propTypes = {
    courses: propTypes.array.isRequired,
    authors: propTypes.array.isRequired,
    loading: propTypes.bool.isRequired,
    dispatchLoadCourses: propTypes.func.isRequired,
    dispatchLoadAuthors: propTypes.func.isRequired,
    dispatchDeleteCourse: propTypes.func.isRequired
};

//this injects the state used/supported by this container component into the props, to be passed down to the view
function mapStateToProps(state) {
    return {
        //this verifies is authors list has been returned so they can be weaved in the "merged result"
        courses: state.authors.length === 0 ? []
            : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(a => a.id === course.authorId).name
                }
            }),

        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    }
}

const mapDispatchToProps = {
    dispatchLoadCourses: loadCourses,
    dispatchLoadAuthors: loadAuthors,
    dispatchDeleteCourse: deleteCourseOptimistic
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPageFunctionComponent);
