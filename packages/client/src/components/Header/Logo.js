import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { headerItem } from '../shared/helpers';
import SVG from 'react-inlinesvg';

const TartarusLogo = require('../assets/TartarusLogo.svg');

const Logo = styled(Link)`
  ${headerItem};

  margin-right: 8px;
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.normalText};
  text-decoration: none;
  padding: 0;

  @media (max-width: 768px) {
    // padding: 0 8px 0 16px;
    font-size: 20px;
  }
`;

const HeaderLogo = () => {
  return (
    <Logo to='/'>
      <SVG src={TartarusLogo} width='32px' height='32px' />
      {/* <img src={TartarusLogo} alt='My logo' width='32px' height='32px' /> */}

      tartaros
    </Logo>
  );
};

export default HeaderLogo;
