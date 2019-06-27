import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import propTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

//deconstructing props and rest operator for any other that has not been deconstructed (in this case, props itself)
function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {

	//using the spread operator here (not rest as above in the arguments list)
	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({ ...props.errors });
	const [saving, setSaving] = useState(false);

	/**
	   Example of useEffect hooks:
	   The second argument (in this case an empty array), is a list of objects to be watched for changes. 
	   Any time any object in that array changes the hook is executed.
	   In this case it will be executed only once, because the array is empty
	*/
	useEffect(() => {

		if (courses.length === 0) {
			loadCourses().catch(error => {
				alert("Loading courses failed " + error);
			});
		} else {
			setCourse({ ...props.course });
		}

		if (authors.length === 0) {
			loadAuthors().catch(error => {
				alert("Loading authors failed " + error);
			});
		}

	}, [props.course]);

	function handleChange(event) {
		const { name, value } = event.target; //deconstructing the event
		setCourse(prevCourse => ({
			...prevCourse,
			[name]: name === "authorId" ? parseInt(value, 10) : value
		}
		))
	}

	function formIsValid() {
		const { title, authorId, category } = course;
		const errors = {};

		if (!title) errors.title = "Title is required.";
		if (!authorId) errors.author = "Author is required";
		if (!category) errors.category = "Category is required";

		setErrors(errors);
		// Form is valid if the errors object still has no properties
		return Object.keys(errors).length === 0;
	}

	function handleSave(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		setSaving(true);
		saveCourse(course).then(() => {
			toast.success("Course saved.");
			history.push("/courses");
		}).catch(error => {
			setSaving(false);
			setErrors({ onSave: error.message });
		});
	}

	return authors.length === 0 || courses.length === 0
		? (<Spinner />)
		: <CourseForm course={course} errors={errors} onSave={handleSave} saving={saving} onChange={handleChange} authors={authors} />;
}

ManageCoursePage.propTypes = {
	course: propTypes.object.isRequired,
	courses: propTypes.array.isRequired,
	authors: propTypes.array.isRequired,
	loadCourses: propTypes.func.isRequired,
	loadAuthors: propTypes.func.isRequired,
	saveCourse: propTypes.func.isRequired,
	errors: propTypes.object.isRequired,
	history: propTypes.object.isRequired
}

export function getCourseBySlug(courses, slug) {
	return courses.find(course => course.slug === slug || null);
}

/*
  This injects the state used/supported by this container component into the props, 
  to be passed down to the view

  The ownProps argument is a reference to the component's props, which we will use here 
  to get the URL injected by ROuter.
*/
function mapStateToProps(state, ownProps) {
	const slug = ownProps.match.params.slug;
	const _course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
	return {
		course: _course,
		courses: state.courses,
		authors: state.authors
	}
}

//this injects the actions supported by this container component into the props, to be passed down to the view
const mapDispatchToProps = {
	loadCourses: loadCourses,
	loadAuthors: loadAuthors,
	saveCourse: saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
