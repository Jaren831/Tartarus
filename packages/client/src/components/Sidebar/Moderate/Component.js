import React, { Component } from 'react';
import TartarusContract from '../../../contracts/Tartarus.json';
import styled from 'styled-components/macro';
import { withRouter } from 'react-router-dom';
import LoadingTest from '../../shared/LoadingIndicator/LoadingTest.js';
import ModerateList from './ModerateList';
import ModerateHeader from './ModerateHeader.js';
import NotAuthorized from '../../shared/NotAuthorized.js';
import Divider from '../Divider.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  // width: 100%;
  // border: 1px solid ${props => props.theme.border};
  // background-color: ${props => props.theme.foreground};
  // margin-top: 12px;
`;

class ModerateSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isModerator: false,
      exists: true
    };
  }

  componentDidMount() {
    this.instantiateContract();
  }

  instantiateContract = () => {
    const contract = require('truffle-contract');
    const tartarus = contract(TartarusContract);
    tartarus.setProvider(this.props.web3.currentProvider);
    this.props.web3.eth.getAccounts((error, accounts) => {
      tartarus.at(this.props.tartarusAddress).then(instance => {
        instance.isModerator
          .call(
            this.props.web3.utils.fromAscii(this.props.username),
            this.props.web3.utils.fromAscii(this.props.forumName),
            {
              from: accounts[0],
              gasPrice: 20000000000
            }
          )
          .then(isModerator => {
            console.log(isModerator);
            this.setState({
              isModerator: isModerator,
              loading: false
            });
          });
      });
    });
  };

  createModerator = () => {
    this.props.history.push(
      `/f/${this.props.forumName}/moderate/moderators/create`
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <Wrapper>
          <LoadingTest />
        </Wrapper>
      );
    } else {
      if (!this.state.isModerator) {
        return <NotAuthorized />;
      } else {
        return (
          <Wrapper>
            <ModerateHeader
              userPermissions={this.props.userPermissions.moderator[0]}
              createModerator={this.createModerator}
              forumName={this.props.forumName}
            />
            <Divider />
            <ModerateList forumName={this.props.forumName} />
          </Wrapper>
        );
      }
    }
  }
}

export default withRouter(ModerateSidebar);
