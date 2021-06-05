import './App.css';
import React, { useState, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : [];
  });
  const [editId, setEditId] = useState("");



  const goBtnHandler = (e) => {
    e.preventDefault();
    if (editId) {
      const updateTodos = todos.map((todo) =>
        todo.id === editId
          ? { id: todo.id, input }
          : { id: todo.id, input: todo.input }
      );

      setTodos([...updateTodos]);
      setInput("");
      setEditId("");
      return;
    }
    if (input !== "") {
      setTodos([{ id: input + Date.now(), input }, ...todos]);
      setInput("");
    }
  };

  const deleteHandler = (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos([...updateTodos]);
  };

  const editHandler = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setInput(editTodo.input);
    setEditId(editTodo.id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>TODO APP</h1>
        <form className="todoForm" onSubmit={goBtnHandler}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "Add"}</button>
        </form>
        <ul className="todos">
          {todos.map((todos) => (
            <li className="todo" key={todos.id}>
              <span className="todo-text">{todos.input}</span>
              <button className="edit-btn" onClick={() => editHandler(todos.id)}>Edit</button>
              <button className = "delete-btn" onClick={() => deleteHandler(todos.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
