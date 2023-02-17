import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "./types";

type FetchTodosError = {
  message: string;
};

export const fetchTodos = createAsyncThunk<Todo[], number, { rejectValue: FetchTodosError }>(
  "todos/fetch",
  async (limit: number, thunkApi) => {
    // Fetch the backend endpoint:
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);

    const data: Todo[] = await response.json();

    if (response.status !== 200) {
      // Return the error message:
      return thunkApi.rejectWithValue({ message: "Failed to fetch todos." });
    }
    // Get the JSON from the response:
    // Return result:
    return data;
  }
);



