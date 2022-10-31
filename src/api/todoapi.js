import axios from 'axios';
import { API_URL } from './constants';

export const getToDos = () => axios.get(`${API_URL}/ToDos`);
