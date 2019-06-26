import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createAuthor(author) {
	// debugger;
	return { type: types.CREATE_AUTHOR, author: author };
}

export function loadAuthorsSuccess(authors) {
	return {
		type: types.LOAD_AUTHORS_SUCCESS,
		authors: authors
	};
}

export function loadAuthors() {

	return function (dispatch) { //redux thunk injects dispatch here so we don't have to
		dispatch(beginApiCall());
		return authorApi.getAuthors().then(authors => {
			dispatch(loadAuthorsSuccess(authors));
		}).catch(error => {
			dispatch(apiCallError(error));
			throw error;
		}
		)
	}
}