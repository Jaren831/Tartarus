import React, { Component } from 'react';
import styled from 'styled-components/macro';
import HeaderLogo from './Logo';
import HeaderDarkButtonContainer from './DarkButton/Container';
import HeaderUsername from './Username';
import HeaderNavLink from './NavLink';
import { userLogout } from '../../redux/actions/actions';
import SearchContainer from './Search/SearchContainer';
import FilterContainer from './Filter/FilterContainer';
import CategoryMenu from './CategoryMenu/Container';
import Drawer from '../Drawer/Component';
import { setDrawerState } from '../../redux/actions/actions';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DrawerButton from '../Buttons/DrawerButton';

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: stretch;
  // margin-bottom: 24px;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  border-bottom: 1px solid ${props => props.theme.border};
  height: 48px;
  padding: 0 10vw;
  background-color: ${props => props.theme.foreground};
  user-select: none;
  @media (max-width: 425px) {
    margin-bottom: 0px;
    height: 40px;
  }
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 0px;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  // margin-right: 1.5%;
  width: 100%;
  margin-right: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const styles = theme => ({
  menuButton: {
    marginLeft: 'auto'
  }
});

class Header extends Component {
  handleDrawerToggle = () => {
    this.props.dispatch(setDrawerState());
  };

  render() {
    const { classes } = this.props;
    return (
      <Wrapper>
        <IconWrapper>
          <IconButton
            className={classes.menuButton}
            color='inherit'
            aria-label='Open drawer'
            onClick={this.handleDrawerToggle}
          >
            <DrawerButton />
          </IconButton>
        </IconWrapper>
        <HeaderLogo />
        {/* <FilterWrapper>
          <FilterContainer />
        </FilterWrapper> */}
        {/* <SearchContainer /> */}
        <HeaderDarkButtonContainer />
        {this.props.username ? (
          <>
            <HeaderUsername
              notifications={
                this.props.userSettings[this.props.username].notifications
                  .length
              }
              username={this.props.username}
            />
            <HeaderNavLink
              as='span'
              onClick={() => this.props.dispatch(userLogout())}
            >
              log out
            </HeaderNavLink>
          </>
        ) : (
          <>
            <HeaderNavLink to='/login'>log in</HeaderNavLink>
            <HeaderNavLink to='/signup'>sign up</HeaderNavLink>
          </>
        )}
      </Wrapper>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
