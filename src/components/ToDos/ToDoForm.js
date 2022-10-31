import React, {useState, useEffect} from 'react'
import {Formik, Form, Field} from 'formik'
import { todosSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDosForm(props) {
    
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7202/api/Categories`).then(response => setCategories(response.data))
    }
    const handleSubmit = (values) => {
        // console.log(values)        
        if(values.done === '0'){
            values.done = false
        }else{
            values.done = true
        }
        if(!props.todos){        
            const todosToCreate = values
            axios.post(`https://localhost:7202/api/ToDos`, todosToCreate).then(() => {
                props.getTodos()
                props.setShowCreate(false)
            })
        }       
        else{
            const todosToEdit = {
                todoId: props.todo.todoId,
                name: values.name,
                done: values.done,
                categoryId: values.categoryId
            }
            axios.put(`https://localhost:7202/api/ToDos/${props.todo.todoId}`, todosToEdit).then(() => {
                props.todos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);
    
  return (
    <Formik
        initialValues={{
            name: props.todos ? props.todos.name : '',
            done: props.todos ? props.todos.done : '',
            categoryId: props.todos ? props.todos.categoryId : ''
        }}
        validationSchema={todosSchema}
        onSubmit={(values) => handleSubmit(values)}
    >
      
        {({errors, touched}) => (
            <Form id='todosForm'>
                <div className='form-group m-3'>
                    <Field name='name' className='form-control' placeholder='Name'/>
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                    ) : null
                    }
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='done' className='form-control'>
                        <option value={1}>Done</option>
                        <option value={0}>Incomplete</option>
                    </Field>
                </div>            
                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>[--Please Choose--]</option>                        
                        {categories.map(cat =>
                            <option key={cat.categoryId} value={cat.categoryId}>
                                {cat.catName}
                            </option>
                        )}
                    </Field>
                </div>
                <div className='form-group m-3'>
                    <button type='submit' className='btn btn-info m-3'>Submit ToDo to API</button>
                </div>
            </Form>
        )}
    </Formik>
  )
}