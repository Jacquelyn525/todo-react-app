//#region Imports

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { createToDo, editToDo } from '../../api/todoapi';

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

const todosSchema = Yup.object().shape({
  name: Yup.string().max(25, 'Max 25 characters').required(),
  done: Yup.bool(),
  categoryId: Yup.number().required(),
});

export default function ToDosForm({
  getToDos,
  setShowEdit,
  setShowCreate,
  toDoItem,
}) {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios
      .get(`https://localhost:7202/api/Categories`)
      .then((response) => setCategories(response.data));
  };

  const afterSubmit = () => {
    getToDos();

    if (!toDoItem) {
      setShowCreate(false);
    } else {
      setShowEdit(false);
    }
  };

  const handleSubmit = (values) => {
    if (!toDoItem) {
      createToDo({
        ...values,
      }).then(afterSubmit);
    } else {
      const todosToEdit = {
        ...values,
        toDoId: toDoItem.toDoId,
      };
      editToDo(todosToEdit).then(afterSubmit);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Formik
      initialValues={{
        name: toDoItem ? toDoItem.name : '',
        done: toDoItem ? toDoItem.done : false,
        categoryId: toDoItem ? toDoItem.categoryId : -1,
      }}
      validationSchema={todosSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form id="todosForm">
          <div className="form-group m-3">
            <Field name="name" className="form-control" placeholder="Name" />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </div>
          <div className="form-group form-check m-3 d-flex justify-content-start">
            {/* https://www.bezkoder.com/react-form-validation-example-formik/ - checkbox example */}
            <Field type="checkbox" name="done" className="form-check-input" />
            <label className="form-check-label">
              <span className="px-2">Task Completed</span>
            </label>
          </div>
          <div className="form-group m-3">
            <Field as="select" name="categoryId" className="form-control">
              <option value="" disabled>
                [--Please Choose--]
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.catName}
                </option>
              ))}
            </Field>
          </div>
          <div className="form-group m-3">
            <button type="submit" className="btn btn-info m-3">
              Submit ToDo to API
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
