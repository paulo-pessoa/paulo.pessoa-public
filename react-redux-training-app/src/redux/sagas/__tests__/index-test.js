/***
 Testing sagas using the correct approach
 ***/
import {recordSaga} from "./recordSaga";
import {beginApiCall} from "../../actions/apiStatusActions";
import {loadAuthorsSaga} from "../index";
import {loadAuthorsSuccess} from "../../actions/authorActions";

const mockAuthorApi = require('../../../api/authorApi');

jest.mock("../../../api/authorApi", () => (
    {
        ...(jest.requireActual("../../../api/authorApi")),
        getAuthors: () => {
            return [{name: "Mr. Author"}]
        }
    }
));

let authors;

describe('testing saga using recordSaga', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        authors = [{name: "Mr. Author"}];
    });

    it("loadAuthors", async () => {

        mockAuthorApi.getAuthors = jest.fn(() => {
            return authors
            // throw new Error('Testing throw');
        });

        const action = {};
        const sagaResult = await recordSaga(loadAuthorsSaga,action);
        console.log(sagaResult);
        expect(sagaResult).toContainEqual(beginApiCall);
        expect(mockAuthorApi.getAuthors).toHaveBeenCalled();
        expect(mockAuthorApi.getAuthors).toHaveReturnedWith(authors);
        expect(sagaResult).toContainEqual(loadAuthorsSuccess(authors));
    });

});
