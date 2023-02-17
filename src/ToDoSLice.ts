import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchTodos } from "./fetchTodos";


type TodoId = string;

type Todo = {
  id: TodoId;
  title: string;
  completed: boolean;
};
type TodosState = {
  // In `status` we will watch
  // if todos are being loaded.
  status: "loading" | "idle";

  // `error` will contain an error message.
  error: string | null;
  list: Todo[];
};

const initialState: TodosState = {
  list: [],
  error: null,
  status: "idle",
};


export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(
      // Arguments of actions are basically the same.
      // The first one is the state,
      // the second one is an action.
      state: TodosState,

      // `PayloadAction` is a generic-type
      // that allows you to specify an action
      // with a typped payload.
      // In our case, this payload is of `Todo` type:
      action: PayloadAction<Todo>
    ) {
      // RTK allows us to write 
      // “mutating” logic in reducers. 
      // It doesn't actually mutate the state 
      // because it uses the Immer library,
      // which detects changes to a "draft state" 
      // and produces a brand new
      // immutable state based off those changes:
      state.list.push(action.payload);
    },
    toggleTodo(
      // You can skip typing the state,
      // it will be inferred from the `initialState`.
      // I prefer to explicitly type everything I can
      // but this is not obligatory.
      // For example, this will work as well:
      state,
      action: PayloadAction<TodoId>
    ) {
      const index = state.list.findIndex(
        ({ id }) => id === action.payload);

      if (index) {
        state.list[index].completed = !state.list[index].completed;
      }
    },
  },


  // In `extraReducers` we declare 
  // all the actions:
  extraReducers: (builder) => {

    // When we send a request,
    // `fetchTodos.pending` is being fired:
    builder.addCase(fetchTodos.pending, (state) => {
      // At that moment,
      // we change status to `loading` 
      // and clear all the previous errors:
      state.status = "loading";
      state.error = null;
    });

    // When a server responses with the data,
    // `fetchTodos.fulfilled` is fired:
    builder.addCase(fetchTodos.fulfilled,
      (state, { payload }) => {
        // We add all the new todos into the state
        // and change `status` back to `idle`:
        state.list.push(...payload);
        state.status = "idle";
      });

    // When a server responses with an error:
    builder.addCase(fetchTodos.rejected,
      (state, { payload }) => {
        // We show the error message
        // and change `status` back to `idle` again.
        if (payload) { state.error = payload.message; }
        state.status = "idle";
      });
  },
});


export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;


export const selectTodos = (state: RootState) => state.todos.list;
export const selectStatus = (state: RootState) =>
  state.todos.status;