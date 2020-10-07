import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DECREMENT, INCREMENT } from "../actions/actionTypes";

const Counter = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();
  const increment = () => dispatch({ type: INCREMENT });
  const decrement = () => dispatch({ type: DECREMENT });

  return (
    <div>
      <h2>Counter</h2>
      <button onClick={increment}>Increase Count</button>
      <span aria-label='count'>{count}</span>
      <button onClick={decrement}>Decrease Count</button>
    </div>
  );
};

export default Counter;
