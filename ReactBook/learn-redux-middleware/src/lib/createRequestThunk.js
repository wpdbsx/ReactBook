import { finishLoading, startLoading } from "../modules/loading";

export default function createRequestThunk(type, request) {
  //성공 및 실패 액션 타입을 정의합니다.
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params) => async (dispatch) => {
    dispatch({ type: type }); //시작됨
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      console.log(SUCCESS);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); //성공
      dispatch(finishLoading(type));
      console.log(SUCCESS + "가됫냐" + response.data.body);
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); //에러발생
      dispatch(startLoading(type));
      throw e;
    }
  };
}
