import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPageFunctionComponent from "./courses/CoursesPageFunctionComponent";
// import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import ConfigViewerContainer from "./config-viewer/ConfigViewerContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="container-fluid">
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/courses" component={CoursesPageFunctionComponent} />
				<Route path="/course/:slug" component={ManageCoursePage} />
				<Route path="/course" component={ManageCoursePage} />
				<Route path="/config" component={ConfigViewerContainer} />
				<Route component={PageNotFound} />
			</Switch>
			<ToastContainer autoClose={3000} hideProgressBar />
		</div>
	);
}

export default App;
