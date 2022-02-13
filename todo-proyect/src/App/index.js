import React, { useState, useEffect } from 'react';
import { AppUI } from './AppUI.js'
import './App.css';

// const defaultTodos = [
//   { text: 'chuparse un limon', completed: false},
//   { text: 'Jugar un Warzone', completed: false},
//   { text: 'Tomarse un heladito', completed: false}
// ]

function useLocalStorage(itemName,initialValue) {
  const [loading, setLoading] = useState(true);
  const [error, setError]= useState(false)
  const [item, setItem] = useState(initialValue);
  useEffect(
    () => {
      setTimeout(() => {
        try {
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
          
          if (!localStorageTodos) {
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
          } else {
            parsedItem = JSON.parse(localStorageTodos);
          }
            
          setItem(parsedItem);
          setLoading(false);
        } catch (error) {
          setError(error)
        }
      }, 10000)
    })
  
  const saveItem = (newItem) => {
    try {
        const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
    } catch (error) {
      setError(error)
    }
  };
  return {
    item,
    saveItem,
    loading,
    error,
  }
}  

function App() {

  const {
    item:todos, 
    setItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

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
  };
  
  return (
    <AppUI
      loading={loading}
      error={error}
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
