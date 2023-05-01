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
  {
    user: {
      id: 1,
      name: 'User1',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 100,
  },
  {
    user: {
      id: 2,
      name: 'User2',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 90,
  },
];

describe('Leaderboards component', () => {
  it('should render the title correctly', async () => {
    render(<Leaderboards leaderboards={leaderboards} />);
    const titleElement = screen.getByText('Top User');

    expect(titleElement).toBeInTheDocument();
  });

  it('should render the user list correctly', async () => {
    render(<Leaderboards leaderboards={leaderboards} />);
    const userElements = screen.getAllByRole('listitem');

    expect(userElements).toHaveLength(2);
    expect(userElements[0]).toHaveTextContent('User1');
    expect(userElements[0]).toHaveTextContent('100');
    expect(userElements[1]).toHaveTextContent('User2');
    expect(userElements[1]).toHaveTextContent('90');
  });
});
