// import { createAction, handleActions } from "redux-actions";

import { createAction, handleActions } from "redux-actions";
import {
  delay,
  put,
  takeEvery,
  throttle,
  takeLatest,
  select,
} from "redux-saga/effects";
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE"; //액션함수정의

// thunk 예제
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";

const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

//액션함수 정의하고 외부로 보내기
// thunk 예제
//1초 뒤에 increase 혹은 decrease 함수를 디스패치함
// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };
// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

const initialState = 0;
//상태는 꼭 객체일 필요가 없다. 숫자도 작동 가능

function* increaseSaga() {
  yield delay(1000); //1초 기다립니다.
  yield put(increase()); //특정액션을 디스패치합니다.
  const number = yield select((state) => state.counter); // state는 스토어 상태를 의미함
  console.log("현재 값은" + number + " 입니다.");
}
function* decreaseSaga() {
  yield delay(1000); //1초를 기다립니다.
  yield put(decrease()); //특정액션 디스패치
}

export function* counterSaga() {
  //tekeEvery는 들어오는 모든 액션에 대한 특정 작업을 처리해 줍니다.
  // yield takeEvery(INCREASE_ASYNC, increaseSaga);

  // 첫 번째 파라미터: n초 * 1000
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  //takeLastse 는 기존에 진행중이던 작업이 있다면 취소 처리하고
  //가장 마지막으로 실행된 작업만 수행합니다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}
const counter = handleActions(
  {
    [INCREASE]: (state, action) => state + 1,
    [DECREASE]: (state, action) => state - 1,
  },
  initialState
);

export default counter;
