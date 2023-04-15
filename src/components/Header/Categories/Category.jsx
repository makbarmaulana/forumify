import React from 'react';
import styled from 'styled-components';

function Category() {
  const categories = [
    'introduction',
    'react',
    'redux',
    'cicd',
    'styled-component',
  ];

  return (
    <CategoryList>
      {categories.map((cat) => (
        <CategoryItem key={cat}>{cat}</CategoryItem>
      ))}
    </CategoryList>
  );
}

export default Category;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0 1em 1em 1em;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryItem = styled.span`
  white-space: nowrap;
  font-size: 0.85rem;
  font-weight: 500;
  color: #525252;
  border: 2px solid #bfc2c5;
  border-radius: 2em;
  padding: 0.3em 0.8em;
  user-select: none;
  cursor: pointer;

  &:hover {
    border-color: #343B4B;
    background-color: #343B4B;
    color: #f2f2f2;
  }
`;
