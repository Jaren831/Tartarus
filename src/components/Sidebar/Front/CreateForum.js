import React from 'react';
import styled from 'styled-components/macro';
import Button from '../../shared/Button';

const ForumButton = styled(Button)`
  border-radius: 2px 2px 0 0;
  padding: 16px;
  text-decoration: none;
  text-align: center;
`;

const CreateForumButton = props => (
  <ForumButton onClick={props.createForumHandler}>create circle</ForumButton>
);

export default CreateForumButton;