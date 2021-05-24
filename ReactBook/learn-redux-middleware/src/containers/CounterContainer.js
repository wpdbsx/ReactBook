import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import {
  decrease,
  decreaseAsync,
  increase,
  increaseAsync,
} from "../modules/counter";
const CounterContainer = () => {
  const number = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  return (
    <Counter
      number={number}
      onIncrease={() => dispatch(increaseAsync())}
      onDecrease={() => dispatch(decreaseAsync())}
    />
  );
};

export default CounterContainer;
