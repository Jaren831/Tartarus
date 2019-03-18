import React from 'react';
import styled from 'styled-components/macro';
import SubmitButton from '../shared/form/SubmitButton';

const StyledSubmitButton = styled(SubmitButton)`
  margin: 4px;
  padding: 4px 12px;
`;

const CommentFormSubmitButton = props => (
  <StyledSubmitButton type='submit' onClick={props.onClick}>
    submit
  </StyledSubmitButton>
);

export default CommentFormSubmitButton;