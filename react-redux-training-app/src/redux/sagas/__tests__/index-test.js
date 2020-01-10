/***
 Testing sagas using the correct approach
 ***/
import { recordSaga } from "./recordSaga";
import { beginApiCall } from "../../actions/apiStatusActions";
import { loadAuthorsSaga } from "../index";
import { loadAuthorsSuccess, loadAuthorsFailure } from "../../actions/authorActions";

const mockAuthorApi = require('../../../api/authorApi');

// jest.mock("../../../api/authorApi", () => (
//     {
//         ...(jest.requireActual("../../../api/authorApi")),
//         getAuthors: () => {
//             return [{name: "Mr. Author"}]
//         }
//     }
// ));
// jest.mock("../../../api/authorApi");

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

        const sagaRecordedActions = await recordSaga(loadAuthorsSaga,action);

        console.log(sagaRecordedActions);
        expect(sagaRecordedActions).toContainEqual(beginApiCall);
        expect(mockAuthorApi.getAuthors).toHaveBeenCalled();
        expect(mockAuthorApi.getAuthors).toHaveReturnedWith(authors);
        expect(sagaRecordedActions).toContainEqual(loadAuthorsSuccess(authors));
        // expect(sagaRecordedActions).toContainEqual(loadAuthorsFailure);

    });

});
