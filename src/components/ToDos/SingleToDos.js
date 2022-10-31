//#region Imports

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import ToDoEdit from './ToDoEdit';
import { deleteToDo } from '../../api/todoapi';

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

export default function SingleToDos({ getToDos, ToDoItem }) {
  const { currentUser } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const refreshToDos = () => {
    getToDos();
  };

  const deleteToDos = (toDoId) => {
    if (window.confirm(`Are you sure you want to delete ${ToDoItem.name}?`)) {
      deleteToDo(toDoId).then(() => {
        refreshToDos();
      });
    }
  };

  return (
    <div className="singleToDos col-md-5 m-4">
      {/* EDIT UI */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
        <div>
          <button id="editLink" onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button
            className="m-1 rounded"
            id="deleteLink"
            onClick={() => deleteToDos(ToDoItem.toDoId)}
          >
            <FaTrashAlt />
          </button>
          {showEdit && (
            <ToDoEdit
              toDoItem={ToDoItem}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getToDos={getToDos}
            />
          )}
        </div>
      )}
      <h3>{ToDoItem.name}</h3>
      {ToDoItem.description !== null ? (
        <p>{ToDoItem.description}</p>
      ) : (
        <p>No Description Provided</p>
      )}
      <a
        href={ToDoItem.url}
        target="_blank"
        rel="noreferrer"
        className="btn btn-info"
      >
        Visit {ToDoItem.linkText}
      </a>
    </div>
  );
}
