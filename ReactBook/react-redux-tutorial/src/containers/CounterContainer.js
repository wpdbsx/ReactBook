import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};
export default React.memo(CounterContainer);
// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });
// const mapDispatchToProps = (dispatch) => ({
//   //임시 함수
//   increase: () => {
//     dispatch(increase());
//   },
//   decrease: () => {
//     dispatch(decrease());
//   },
// });
// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   // (dispatch) => ({
//   //   increase: () => dispatch(increase()),
//   //   decrease: () => dispatch(decrease()),
//   // }),
//   // (dispatch) =>
//   //   bindActionCreators(
//   //     {
//   //       increase,
//   //       decrease,
//   //     },
//   //     dispatch,
//   //   ),
//   {
//     increase,
//     decrease,
//   },
// )(CounterContainer);
