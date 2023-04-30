/**

Test scenario for Leaderboards component
Leaderboards component
should render the title correctly
should render the user list correctly
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Leaderboards from './Leaderboards';

const leaderboards = [
  { user: { id: 1, name: 'User1', avatar: 'avatar1.png' }, score: 100 },
  { user: { id: 2, name: 'User2', avatar: 'avatar2.png' }, score: 90 },
  { user: { id: 3, name: 'User3', avatar: 'avatar3.png' }, score: 80 },
];

describe('Leaderboards component', () => {
  it('should render the title correctly', () => {
    render(<Leaderboards leaderboards={leaderboards} />);
    const titleElement = screen.getByText('Top User');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the user list correctly', () => {
    render(<Leaderboards leaderboards={leaderboards} />);
    const userElements = screen.getAllByRole('listitem');
    expect(userElements).toHaveLength(3);
    expect(userElements[0]).toHaveTextContent('User1');
    expect(userElements[0]).toHaveTextContent('100');
    expect(userElements[1]).toHaveTextContent('User2');
    expect(userElements[1]).toHaveTextContent('90');
    expect(userElements[2]).toHaveTextContent('User3');
    expect(userElements[2]).toHaveTextContent('80');
  });
});
