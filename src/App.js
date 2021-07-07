import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  // Ran when App component gets updated
  useEffect(() => {
    const tempTodos = localStorage.getItem('stored-todos');
    const loadedTodos = JSON.parse(tempTodos);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  // Ran when Todos get updated
  useEffect(() => {
    const tempTodos = JSON.stringify(todos);
    localStorage.setItem('stored-todos', tempTodos);

  }, [todos]);

  const resetTodos = () => {
        localStorage.clear();
        setTodos([]);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }
    // takes the current todos state then creating a new array with a newTodo added on to the todos state
    setTodos([...todos].concat(newTodo));
    setTodo('');
  }

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleCheck = (id) => {
    const updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
    })
   
    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <div className='resetButton' onClick={resetTodos}>Clear List</div>
      <h1>Task Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' required onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type='submit'>AddTodo</button>
      </form>
      {todos.map((todo) => <div key={todo.id} className='todoContainer'>
        <input type='checkbox' onChange={() => toggleCheck(todo.id)} checked={todo.completed} />
        <div>{todo.text}</div>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>)}
    </div>
  )
}

export default App;
