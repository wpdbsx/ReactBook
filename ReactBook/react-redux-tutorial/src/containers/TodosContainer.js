import React, { useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Todos from '../components/Todos';
import useActions from '../lib/useAction';
import { changeInput, insert, toggle, remove } from '../modules/todos';
const TodosContainer = ({}) => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    [],
  );
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
}; //컴포넌트를 그려준다.

export default connect(
  //비구조화 할당을 통해 todos를 분리하여
  // state.todos.input 대신 todos.input을 사용
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  },
)(TodosContainer);
