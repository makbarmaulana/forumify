import React from 'react';
import styled from 'styled-components';

function Avatar({ src, alt, width }) {
  return (
    <AvatarWrapper>
      <Image src={src} alt={alt} width={width} loading="lazy" />
    </AvatarWrapper>
  );
}

export default Avatar;

const AvatarWrapper = styled.div`
  display: flex;
  place-items: center;
`;

const Image = styled.img`
  width: ${({ width }) => width || '2.2em'};
  border-radius: ${({ bdRad }) => bdRad || '50%'};
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;
