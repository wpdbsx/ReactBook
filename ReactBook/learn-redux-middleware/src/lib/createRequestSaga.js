import { put } from "redux-saga/effects";
import { callExpression } from "../../../../../../AppData/Local/Microsoft/TypeScript/4.2/node_modules/@babel/types/lib/index";
import { finishLoading, startLoading } from "../modules/loading";

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield callExpression(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩끝
  };
}
