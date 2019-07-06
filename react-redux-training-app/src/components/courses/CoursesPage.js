import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {

	state = {
		redirectToAddCoursePage: false
	};

	componentDidMount() {
		const { courses, authors, actions } = this.props;

		if (courses.length === 0) {
			actions.loadCourses().catch(error => {
				alert("Loading courses failed " + error);
			});
		}

		if (authors.length === 0) {
			actions.loadAuthors().catch(error => {
				alert("Loading authors failed " + error);
			});
		}
	}

	/**
	* async and await are used here as an example of an alternaive way of handling asynhronous interactions
	*/
	handleDeleteCourse = async course => {
		toast.success("Course deleted");
		try {
			await this.props.actions.deleteCourse(course);
		} catch (error) {
			toast.error("Delete failed. " + error.message, { autoClose: false });
		}
	};


	render() {
		return (
			<>
				{this.state.redirectToAddCoursePage && <Redirect to="/course" />}
				<h2>Courses</h2>
				{this.props.loading ?
					<Spinner /> : (
						<>
							<button
								style={{ marginBottom: 20 }}
								className="btn btn-primary add-course"
								onClick={() => this.setState({ redirectToAddCoursePage: true })}
							>
								Add Course
							</button>
							<CourseList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
						</>
					)
				}
			</>
		);
	}
}

CoursesPage.propTypes = {
	courses: propTypes.array.isRequired,
	authors: propTypes.array.isRequired,
	actions: propTypes.object.isRequired,
	loading: propTypes.bool.isRequired
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

//this injects the actions supported by this container component into the props, to be passed down to the view
function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
			loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
			deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
