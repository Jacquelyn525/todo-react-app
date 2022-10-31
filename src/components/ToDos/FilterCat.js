import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function FilterCat(props) {    
    const [categories, setCategories] = useState([]);


useEffect(() => {
    axios.get('https://localhost:7202/api/Categories').then(response => {
        setCategories(response.data)

    })
}, []);

  return (
    <div className='text-center mt-5'>
        <button onClick={() => props.setFilter(0)} className='btn btn-outline-info bg-dark m-1'>
            All
        </button>        
        {categories.map(cat => 
            <button key={cat.categoryId} className='btn btn-outline-info bg-dark m-1'
            onClick={() => props.setFilter(Number(cat.categoryId))}>
                {cat.catName}
            </button>

        )}
    </div>
  )
}