import { createAction, handleActions } from "redux-actions";
import def from "../../../../../../AppData/Local/Microsoft/TypeScript/4.2/node_modules/ajv/dist/vocabularies/format/format";

const START_LOADING = "loadingSTART_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADIG";

/*
요청을 위한 액션 타입을 payload로 설정합니다.(예: "sample/GET_POST").
*/

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState
);

export default loading;
