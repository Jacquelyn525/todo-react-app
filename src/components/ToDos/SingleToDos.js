import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import ToDoEdit from './ToDoEdit';
import axios from 'axios';

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

export default function SingleToDos(props) {
  console.log(props);
  const { currentUser } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const getToDos = () => {
    props.getToDos();
  }


  const deleteToDos = (id) => {
    if (
      window.confirm(`Are you sure you want to delete ${props.todos.name}?`)
    ) {
      axios.delete(`https://localhost:7202/api/ToDos/${id}`).then(() => {
        getToDos();
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
            onClick={() => deleteToDos(props.todos.toDoId)}
          >
            <FaTrashAlt />
          </button>
          {showEdit && (
            <ToDoEdit
              todos={props.todos}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getTodos={props.getTodos}
            />
          )}
        </div>
      )}
      <h3>{props.todos.name}</h3>
      {props.todos.description !== null ? (
        <p>{props.todos.description}</p>
      ) : (
        <p>No Description Provided</p>
      )}
      <a
        href={props.todos.url}
        target="_blank"
        rel="noreferrer"
        className="btn btn-info"
      >
        Visit {props.todos.linkText}
      </a>
    </div>
  );
}
