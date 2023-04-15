import React from 'react';
import styled from 'styled-components';
import { Button } from '../../Styled/Button';

function Category({ threads, keyword, activeCategory }) {
  const categories = [...new Set(threads.map((thread) => thread.category))];

  const categoryHandler = (e) => {
    keyword(e.target.textContent);
  };

  return (
    <CategoryList>
      <CategoryItem
        onClick={() => keyword('')}
        isActive={activeCategory === ''}
      >
        All
      </CategoryItem>

      {categories.map((category) => (
        <CategoryItem
          key={category}
          onClick={categoryHandler}
          isActive={category === activeCategory}
        >
          {category}
        </CategoryItem>
      ))}
    </CategoryList>
  );
}

export default Category;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-top: 0.8em;
  margin-bottom: 0.5em;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryItem = styled(Button)`
  font-size: 0.75rem;
  font-weight: 500;
  color: #525252;
  border: 2px solid #bfc2c5;
  border-radius: 2em;
  padding: 0.5em 0.8em;

  &:hover {
    color: #343b4b;
    border-color: #343b4b;
  }

  ${({ isActive }) => isActive
    && `
    border-color: #343b4b;
    background-color: #343b4b;
    color: #f2f2f2;

    &:hover {
      color: #f2f2f2;
    }
  `}
`;
