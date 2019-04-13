import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import Header from './Component';
import { userLogout } from '../../redux/actions/actions';

const mapDispatchToProps = { userLogout };

const mapStateToProps = state => ({
  username: state.user.username,
  web3: state.web3
});

const enhance = compose(
  reduxForm({ form: 'search' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const HeaderContainer = enhance(Header);

export default HeaderContainer;
