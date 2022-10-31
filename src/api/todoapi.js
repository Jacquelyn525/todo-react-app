import axios from 'axios';
import { API_URL } from './constants';

export const getToDos = () => axios.get(`${API_URL}/ToDos`);
export const createToDo = (item) => axios.post(`${API_URL}/ToDos`, item);
export const editToDo = (item) => axios.put(`${API_URL}/ToDos/${item.toDoId}`, item);
export const deleteToDo = (toDoId) => axios.delete(`${API_URL}/ToDos/${toDoId}`)

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
