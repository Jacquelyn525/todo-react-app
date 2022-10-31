import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import SingleCategory from './SingleCategory';
import { useAuth } from '../../contexts/AuthContext';
import CatCreate from './CatCreate';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const { currentUser } = useAuth();

  const [showCreate, setShowCreate] = useState(false);

  const getCategories = () => {
    axios.get(`https://localhost:7202/api/Categories`).then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="categories">
      <article className="bg-info p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ? (
            <>
              <button
                onClick={() => setShowCreate(false)}
                className="btn btn-warning"
              >
                Cancel
              </button>
              <CatCreate
                getCategories={getCategories}
                setShowCreate={setShowCreate}
              />
            </>
          ) : (
            <button
              className="btn btn-info"
              onClick={() => setShowCreate(true)}
            >
              Create Category
            </button>
          )}
        </div>
      )}
      <Container className="p-2">
        <table className="table bg-info table-dark my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Description</th>
              {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && (
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {categories.map((x) => (
              <SingleCategory
                key={x.categoryId}
                category={x}
                getCategories={getCategories}
              />
            ))}
          </tbody>
        </table>
      </Container>
    </section>
  );
}
