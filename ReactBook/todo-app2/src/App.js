import React, { useCallback, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTemplate from './Components/TodoTemplate';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: <span className="cd2 co31">할 일+{i}</span>,
      checked: false,
    });
  }
  return array;
}
function App() {
  const [todos, setTodos] = useState(createBulkTodos);
  //고유값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1; // nextid 1씩 더하기
  }, []);
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);
  const onToggle = useCallback((id) => {
    console.log('생성');
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);
  return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert}></TodoInsert>
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
        ></TodoList>
      </TodoTemplate>
    </>
  );
}

export default App;
