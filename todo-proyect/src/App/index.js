import React, { useState } from 'react';
import { AppUI } from './AppUI.js'
import './App.css';

const defaultTodos = [
  { text: 'chuparse un limon', completed: false},
  { text: 'Jugar un Warzone', completed: false},
  { text: 'Tomarse un heladito', completed: false}
]

function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1');
  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([]));
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos);
  }

  const [todos, setTodos] = useState([defaultTodos]);
  const [searchValue, setSearchValue] = useState('');

  //todos ya realizadas (históricas)
  const completedTodos = todos.filter(todo =>!!todo.completed).lengths
  const totalTodos = todos.length;
  
//Busqueda de Todos existentes para no renderizar continuamente todos los todos.-
  let searchedTodos = []
  
  if (setSearchValue.length >= 1) {
    searchedTodos = todos;
  } else {    
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    })    
  }
  //almacenamos en localStorage y de manera persistente la información de Todos que voy realizando y que voy completando y eliminando

  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem('TODOS_V1', stringifiedTodos);
    setTodos(newTodos)
  }
 //Todo Completado (que serán marcadas al click del boton correspondiente en  todoitem)
    const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos]
      newTodos[todoIndex] = {
        text: todos[todoIndex].text,
        completed: true
      }
    saveTodos(newTodos)
  } 

 //Elimianado de Todo (cuando asi se lo determine al click del boton correspondiente en todoitem) 
    const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos]
      newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  } 
  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo = {completeTodo}
      deleteTodo ={deleteTodo}
    />
)

}

export default App;
