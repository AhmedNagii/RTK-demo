import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "./store";
import { fetchTodos } from "./fetchTodos";
import { selectStatus } from "./ToDoSLice";
import { useTypedDispatch } from "./store";
export const LoadTodos = () => {
  const dispatch = useTypedDispatch();

  // Get the current `status`:
  const status = useTypedSelector(selectStatus);

  // When clicked, dispatch `fetchTodos`:
  const handleClick = () => dispatch(fetchTodos(10))

  return (
    // Change the button text
    // depending on the current `status`:
    <button type="button" onClick={handleClick}>
      {status === "loading"
        ? "Loading todos..."
        : "Load todos"}
    </button>
  );
};