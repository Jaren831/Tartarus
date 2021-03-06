import React, { Component } from 'react';
import Form from '../../shared/form/Form';
import { transition } from '../../shared/helpers';
import styled from 'styled-components/macro';
import SearchTextArea from './SearchTextArea';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-left: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // @media (max-width: 768px) {
  //   width: 80%;
  // }
`;

const StyledForm = styled(Form)`
  ${transition('border', 'box-shadow')};

  --border: ${props => (props.error ? props.theme.error : props.theme.accent)};
  --shadow: ${props =>
    props.error ? props.theme.error + '4d' : props.theme.accent + '4d'};

  display: block;
  ${props =>
    props.error
      ? `
  border: 1px solid var(--border)
  `
      : `
  border: 1px solid ${props.theme.border}
`};
  border-radius: 3px;
  width: 100%;
  padding: 0px;
  margin: 2px;
  background-color: ${props => props.theme.inputBackground};
  font-size: 12px;
  color: ${props => props.theme.normalText};
  appearance: none;
  outline: none;
  resize: none;

  :hover,
  :focus {
    border: 1px solid var(--border);
  }

  :focus {
    box-shadow: 0 0 0 2px var(--shadow);
  }

  // @media (max-width: 768px) {
  //   margin-top: -1px;
  //   border-radius: 0;
  //   // border-left: none;
  //   // border-right: none;
  //   // :hover,
  //   // :focus-within {
  //   //   border-left: none;
  //   //   border-right: none;
  //   // }
  // }
`;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showSearch: false
    };
  }

  handleShowSearch = () => {
    this.setState({ showSearch: true });
  };

  handleSubmit = () => {
    console.log(this.props);
    console.log('hello');
    if (this.props.form.search.values) {
      if (this.props.match.params.forumName !== undefined) {
        this.props.history.push(
          `/f/${this.props.match.params.forumName}/search/${this.props.form.search.values.search}`
        );
      } else {
        this.props.history.push(
          `/search/${this.props.form.search.values.search}`
        );
      }
    }
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({ showSearch: false });
    this.props.reset('search');
  };

  render() {
    return (
      <Wrapper>
        {/* <StyledForm loading={this.state.loading}>
          <SearchTextArea name='search' onSubmit={this.handleSubmit} />
        </StyledForm> */}
        {/* {this.state.showSearch && ( */}
        <StyledForm loading={this.state.loading}>
          <SearchTextArea
            name='search'
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            // currentQuery={this.props.form.search.values}
          />
        </StyledForm>

        {/* {this.props.form.search.values !== undefined ? (
          <CancelButton handleClose={this.handleClose} />
        ) : (
          <SearchButton handleShowSearch={this.handleShowSearch} />
        )} */}
      </Wrapper>
    );
  }
}

export default SearchBox;
