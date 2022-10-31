import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Container } from "react-bootstrap";
import SingleToDos from "./SingleToDos";

import FilterCat from "./FilterCat";
import "./ToDos.css";
import ToDoCreate from "./ToDoCreate";

export default function ToDos(props) {
    const [todos, setTodos] = useState([]);

    const { currentUser } = useAuth();
    console.log(currentUser);

    const [showCreate, setShowCreate] = useState(false);

    const [filter, setFilter] = useState(0);

    const getToDos = () => {
        axios.get(`https://localhost:7202/api/ToDos`).then((response) => {
            // console.log(response);
            setTodos(response.data);
        });
    };

    useEffect(() => {
        getToDos();
    }, []);

    return (
        <section className="todos">
            <article className="bg-info p-5">
                <h1 className="text-center">ToDo Dashboard</h1>
            </article>
            {currentUser?.email === process.env.REACT_APP_EMAIL_ADMIN && (
                <div className="bg-dark p-2 mb-3 text-center">
                    <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
                        {!showCreate ? "Create New ToDos" : "Close Form"}
                    </button>
                    <div className="createContainer">
                        {showCreate && (
                            //Conditionally render ResourceCreate if showCreate is true
                            <ToDoCreate getToDos={getToDos} setShowCreate={setShowCreate} />
                        )}
                    </div>
                </div>
            )}
            <Container>
            <FilterCat setFilter={setFilter} />
                <article className="todosGallery row justify-content-center">
                    {filter === 0
                        ? todos.map((x) => <SingleToDos key={x.toDoId} todos={x} getTodos={getToDos} />)
                        : todos
                              .filter((x) => x.categoryId === filter)
                              .map((x) => <SingleToDos key={x.toDoId} todos={x} getTodos={getToDos} />)}
                    {filter !== 0 && todos.filter((x) => x.categoryId === filter).length === 0 && (
                        <h2 className="alert alert-warning text-dark">There are no results for this category.</h2>
                    )}
                </article>
            </Container>
            
        </section>
    );
}
