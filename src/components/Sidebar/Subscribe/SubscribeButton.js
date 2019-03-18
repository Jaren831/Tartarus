import React, { Component } from 'react';
import Button from '../../shared/Button';
import styled from 'styled-components/macro';
import { connect } from 'react-redux';
import {
  // updateForumSubscriptions,
  updateUserSubscriptions
} from '../../../redux/actions/actions';

const SubscribeButton = styled(Button)`
  border-radius: 2px 2px 0 0;
  padding: 16px;
  text-decoration: none;
  text-align: center;
`;

const subscribeHandler = props => {
  console.log(props);
  let newSubscriptionsArray = props.userSettings[
    props.currentUserAddress
  ].subscriptions.slice();
  newSubscriptionsArray.push({
    address: props.forumContext
  });

  let payload = {
    user: props.currentUserAddress,
    subscriptions: newSubscriptionsArray
  };
  // this.props.dispatch(updateForumSubscriptions(newSubscriptionsArray))
  props.dispatch(updateUserSubscriptions(payload));
};

const SidebarSubscribeButton = props => (
  <SubscribeButton onClick={() => subscribeHandler(props)}>
    Subscrbe
  </SubscribeButton>
);

function mapStateToProps(state) {
  return {
    userSettings: state.accounts.userSettings,
    currentUserAddress: state.accounts.currentUserAddress
  };
}

export default connect(mapStateToProps)(SidebarSubscribeButton);