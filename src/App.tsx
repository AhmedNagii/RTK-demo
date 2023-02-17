import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { TodoList } from './TodoList'
import { Provider } from 'react-redux';
import { store } from './store';
import { AddTodo } from './AddToDO';
import { LoadTodos } from './LoadTodos';

function App() {

  return (
    <Provider store={store}>

      <div className="App">
        <AddTodo />
        <TodoList />
        <LoadTodos />
      </div>
    </Provider>
  )
}

export default App
