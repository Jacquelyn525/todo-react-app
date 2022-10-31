import React from 'react';
import ToDoForm from './ToDoForm';

export default function ToDoCreate({ setShowCreate, getToDos }) {
  return (
    <article className="createToDos m-2 text-white justify-content-center">
      <ToDoForm setShowCreate={setShowCreate} getToDos={getToDos} />
    </article>
  );
}
