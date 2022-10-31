import React from 'react';
import { Modal } from 'react-bootstrap';
import ToDoForm from './ToDoForm';

export default function ToDoEdit({
  getToDos,
  setShowEdit,
  showEdit,
  toDoItem,
}) {
  const handleOnHide = () => setShowEdit(false);

  return (
    <Modal show={showEdit} onHide={handleOnHide}>
      <Modal.Header>
        <h3>Editing {toDoItem.name}</h3>
      </Modal.Header>
      <Modal.Body>
        <ToDoForm toDoItem={toDoItem} setShowEdit={setShowEdit} getToDos={getToDos} />
      </Modal.Body>
    </Modal>
  );
}
