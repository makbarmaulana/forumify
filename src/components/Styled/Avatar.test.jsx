/**
 * Test scenario for Avatar
 *
 * - Avatar component :
 *   - should render Avatar with correct attribute
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Avatar from './Avatar';

describe('Avatar component', () => {
  it('should render image with correct attribute', () => {
    const src = 'avatar.png';
    const alt = 'User Avatar';
    const width = '50px';

    render(<Avatar src={src} alt={alt} width={width} />);
    const imageElement = screen.getByRole('img');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', src);
    expect(imageElement).toHaveAttribute('alt', alt);
    expect(imageElement).toHaveAttribute('width', width);
  });
});
