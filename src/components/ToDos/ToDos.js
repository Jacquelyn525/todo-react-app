//#region Imports

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getToDos } from '../../api/todoapi';

import SingleToDos from './SingleToDos';
import './ToDos.css';

import FilterCat from './FilterCat';
import ToDoCreate from './ToDoCreate';
import { Container } from 'react-bootstrap';

//#endregion

// {
//     "toDoId": 1,
//     "name": "Clean Kitchen",
//     "done": false,
//     "categoryId": 2,
//     "category": {
//         "categoryId": 2,
//         "catName": "Home",
//         "catDesc": "Chores",
//         "toDos": []
//     }
// }

export default function ToDos() {
  //#region Hooks

  const { currentUser } = useAuth();
  const [toDoItems, setToDoItems] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState(0);

  const fetchToDos = () =>
    getToDos().then((response) => setToDoItems(response.data));

  useEffect(() => {
    fetchToDos();
  }, []);

  //#endregion

  return (
    <section className="todos">
      <article className="bg-info p-5">
        <h1 className="text-center">ToDo Dashboard</h1>
      </article>
      {currentUser?.email === process.env.REACT_APP_EMAIL_ADMIN && (
        <div className="bg-dark p-2 mb-3 text-center">
          <button
            className="btn btn-info"
            onClick={() => setShowCreate(!showCreate)}
          >
            {!showCreate ? 'Create New ToDos' : 'Close Form'}
          </button>
          <div className="createContainer">
            {showCreate && (
              //Conditionally render ResourceCreate if showCreate is true
              <ToDoCreate getToDos={fetchToDos} setShowCreate={setShowCreate} />
            )}
          </div>
        </div>
      )}
      <Container>
        <FilterCat setFilter={setFilter} />
        <article className="todosGallery row justify-content-center">
          {filter === 0
            ? toDoItems.map((ToDoItem) => (
                <SingleToDos key={ToDoItem.toDoId} ToDoItem={ToDoItem} getToDos={fetchToDos} />
              ))
            : toDoItems
                .filter((ToDoItem) => ToDoItem.categoryId === filter)
                .map((ToDoItem) => (
                  <SingleToDos key={ToDoItem.toDoId} ToDoItem={ToDoItem} getToDos={fetchToDos} />
                ))}
          {filter !== 0 &&
            toDoItems.filter((ToDoItem) => ToDoItem.categoryId === filter).length === 0 && (
              <h2 className="alert alert-warning text-dark">
                There are no results for this category.
              </h2>
            )}
        </article>
      </Container>
    </section>
  );
}
