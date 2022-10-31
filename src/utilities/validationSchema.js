import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(50, 'Max 50 characters')
})

const todosSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 characters').required(),
    done: Yup.string().max(50, 'Max 50 characters'),   
    categoryId: Yup.number().required()
})

export {todosSchema}
export default catSchema