import React from 'react';
import styled from 'styled-components';

function Avatar({ src, alt, width }) {
  return (
    <AvatarWrapper>
      <Image src={src} alt={alt} width={width} />
    </AvatarWrapper>
  );
}

export default Avatar;

const AvatarWrapper = styled.div`
  display: flex;
  place-items: center;
`;

const Image = styled.img`
  width: ${({ width }) => width || '2.5em'};
  border-radius: ${({ bdRad }) => bdRad || '50%'};
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;
