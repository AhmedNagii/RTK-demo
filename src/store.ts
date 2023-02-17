import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch
} from "react-redux";
// Import our reducer from the sluce:
import todosReducer from "./ToDoSLice"

// Use `configureStore` function to create the store:
export const store = configureStore({
  reducer: {
    // Specify our reducer in the reducers object:
    todos: todosReducer,
  },
});

// Define the `RootState` as the return type:
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TypedDispatch = typeof store.dispatch;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
