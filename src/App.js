import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodoList from "./components/todos-list.component";

function App() {
  return (
<Router>
<div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <h1 className="navbar-brand">Mern-Todo-App</h1>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/" className="nav-link">Todos List</Link>
        </li>
        <li className="nav-item">
          <Link to="/create" className="nav-link">Create Todo</Link>
        </li>
        <li className="nav-item">
          <Link to="/edit/:id" className="nav-link">Edit Todo</Link>
        </li>
      </ul>
    </div>
  </nav>
          <Route path="/" exact component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
</div>
</Router>
  );
}

export default App;
