import React from 'react';
import styled from 'styled-components/macro';

const Tip = () => {
  return <i class='fab fa-ethereum' />;
};

const TipButton = styled(Tip)`
  vertical-align: sub;
  cursor: pointer;
  margin-right: 2px;
  margin-left: 2px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${props => props.theme.accent};
    & > svg {
      color: ${props => props.theme.accent} !important;
    }
  }
`;

export default TipButton;
