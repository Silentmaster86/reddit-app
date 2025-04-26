import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../posts/postsSlice.js';
import './categoryFilter.css';

const categories = ['all', 'news', 'sports', 'entertainment', 'technology'];

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.posts.category);

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <div className="category-filter-container">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="category-filter"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
