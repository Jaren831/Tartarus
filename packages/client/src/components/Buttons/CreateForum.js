import React from 'react';
import styled from 'styled-components/macro';
import Button from '../shared/Button';

const ForumButton = styled(Button)`
  border-radius: 2px;
  padding: 16px;
  margin-bottom: 4px;
  text-decoration: none;
  text-align: center;
  background-color: ${props => props.theme.accent};
`;

const CreateForumButton = props => (
  <ForumButton onClick={props.createForumHandler}>create circle</ForumButton>
);

export default CreateForumButton;
