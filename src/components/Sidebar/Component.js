import React from 'react';
import styled from 'styled-components/macro';
import CreateForumButton from './Buttons/CreateForumButton';
import ForumSidebarContainer from './Forum/Container';
import SubscriptionContainer from './Subscription/SubscriptionContainer';
import UserSidebarContainer from './User/Container';
import FrontSidebarContainer from './Front/Container';
import TrendingContainer from './Trending/TrendingContainer';
import AboutContainer from './About/AboutContainer';

const Wrapper = styled.aside`
  position: sticky;
  top: 60px;
  display: flex;
  flex-direction: column;
  flex-basis: 280px;
  max-width: 280px;
  margin-left: 24px;
  // border: 1px solid ${props => props.theme.border};
  border-radius: 2px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Sidebar = props => {
  console.log(props);
  //create frontpage, user, forum, post sidebar component

  switch (props.page) {
    case 'forum':
      return (
        <Wrapper>
          <ForumSidebarContainer forumName={props.forumName} />
          <SubscriptionContainer />
        </Wrapper>
      );
    case 'post':
      return (
        <Wrapper>
          <ForumSidebarContainer forumName={props.forumName} />
          <SubscriptionContainer />
        </Wrapper>
      );
    case 'user':
      return (
        <Wrapper>
          <UserSidebarContainer username={props.username} />
          <SubscriptionContainer />
        </Wrapper>
      );
    default:
      return (
        <Wrapper>
          <FrontSidebarContainer />
          <SubscriptionContainer />
          <TrendingContainer />
          <AboutContainer />
        </Wrapper>
      );
  }
};

export default Sidebar;
