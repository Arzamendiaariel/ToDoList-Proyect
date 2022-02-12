import React, {useState} from 'react';
import {TodoCounter} from './TodoCounter';
import {TodoSearch} from './TodoSearch';
import {TodoList} from './TodoList';
import {TodoItem} from './TodoItem';
import {CreateTodoButton} from './CreateTodoButton';
// import './App.css';

const defaultTodos = [
  { text: 'chuparse un limon', completed: false},
  { text: 'Jugar un Warzone', completed: false},
  { text: 'Tomarse un heladito', completed: false}
]

function App() {
  const [todos, setTodos] = useState([defaultTodos]);
  const [searchValue, setSearchValue] = useState('');

  const completedTodos = todos.filter(todo =>!!todo.completed).lengths
  const totalTodos = todos.length;
  
  let searchedTodos = []
  
  if (!setSearchValue.length >= 1) {
    searchedTodos = todos;
  } else {    
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    })    
  }
  const completeTodos = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text == text);
      todos[todoIndex] = {
        text: todos[todoIndex].text,
        completed: true
      }
  } 

  return (
    <React.Fragment> 
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />    
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
     
      <TodoList>
        {searchedTodos.map(todo=>(
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
        </TodoList>
      <CreateTodoButton />

    </React.Fragment>  
  );
}

export default App;
