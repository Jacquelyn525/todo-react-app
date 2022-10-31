import React from 'react'
import { Modal } from 'react-bootstrap'
import CatForm from './CatForm'

export default function CatEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
        size='lg'
        >
            <Modal.Header closeButton>
                <h2>Editing {props.category.catName}</h2>
            </Modal.Header>
            <Modal.Body>
                <CatForm
                    setShowEdit={props.setShowEdit}
                    getCategories={props.getCategories}
                    category={props.category} />
            </Modal.Body>
        </Modal>
  )
}
