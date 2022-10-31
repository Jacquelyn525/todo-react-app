import React from 'react'
import {Formik, Form, Field} from 'formik'
import catSchema from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        // console.log(values)        
        if(!props.category){            
            const catToCreate = values            
            axios.post(`https://localhost:7202/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)
                props.getCategories()
            })
        }       
        else{           
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }
            axios.put(`https://localhost:7202/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }
  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{              
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : ''
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}>
                {({errors, touched}) => (                   
                    <Form id='catForm' className='row text-center m-auto'>
                        <div className='form-group m-1 p-1'>
                            <Field name='catName' className='form-control' placeholder='Name'/>
                            {errors.catName && touched.catName ?
                            <div className='text-danger'>{errors.catName}</div>
                            : null}
                        </div>
                        <div className='form-group m-1 p-1'>
                            <Field name='catDesc' className='form-control' placeholder='Description'/>
                            {errors.catDesc && touched.catDesc ?
                            <div className='text-danger'>{errors.catDesc}</div>
                            : null}
                        </div>
                        <div className='form-group m-1'>
                            <button type='submit' className='btn btn-success'>Submit Category to API</button>
                        </div>
                    </Form>
                )}

        </Formik>
    </div>
  )
}
