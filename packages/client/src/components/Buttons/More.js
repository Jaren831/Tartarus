import styled from 'styled-components/macro';
import { MdZoomOutMap } from 'react-icons/md';

const More = styled(MdZoomOutMap)`
  vertical-align: sub;
  cursor: pointer;
  margin-right: 2px;
  margin-left: au;
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

export default More;
