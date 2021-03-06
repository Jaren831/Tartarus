import React from 'react';
import { Field } from 'redux-form';
import Form from '../shared/form/Form';
import renderField from '../shared/form/renderField';
import { usernameValidator } from '../../services/validators';
import TartarusContract from '../../contracts/Tartarus.json';
import styled from 'styled-components/macro';
import ValidIcon from '../shared/form/ValidIcon';
import InvalidIcon from '../shared/form/InvalidIcon';
import CheckButton from '../Buttons/CheckButton';
import CancelButton from '../Buttons/CancelButton';
import SubmitButton from '../Buttons/SubmitButton';
import {
  warningToast,
  confirmToast,
  errorToast
} from '../Notifications/Toasts/Toast';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  margin-top: 5px;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  // align-self: flex-end;
  // height: 100%;
  justify-content: center;
  align-items: center;
  // margin-left: 4px;
  // margin-top: 2px;
`;

const InfoWrapper = styled.div`
  color: ${props => props.theme.normalText};
`;

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: false,
      showIcon: false,
      loading: false
    };
  }

  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.username) this.props.history.push('/');
  }

  handleCancel = () => {
    this.props.reset('signup');
    this.props.history.goBack();
  };

  handleChange = props => {
    this.setState({
      available: false,
      showIcon: false
    });
  };

  handleCheckName = () => {
    this.setState({
      loading: true
    });
    const contract = require('truffle-contract');
    const tartarus = contract(TartarusContract);
    tartarus.setProvider(this.props.web3.currentProvider);
    this.props.web3.eth.getAccounts((error, accounts) => {
      tartarus.at(this.props.tartarusAddress).then(instance => {
        instance.users
          .call(
            this.props.web3.utils.fromAscii(
              this.props.form.signup.values.username
            ),
            {
              from: accounts[0],
              gasPrice: 20000000000
            }
          )
          .then(username => {
            console.log(username);
            if (username[2] === '0x0000000000000000000000000000000000000000') {
              console.log('available');
              this.setState({
                available: true,
                showIcon: true,
                loading: false
              });
            } else {
              this.setState({
                available: false,
                showIcon: true,
                loading: false
              });
            }
          });
      });
    });
  };

  createUser = () => {
    this.setState({
      loading: true
    });
    warningToast();
    const contract = require('truffle-contract');
    const tartarus = contract(TartarusContract);
    tartarus.setProvider(this.props.web3.currentProvider);
    this.props.web3.eth.getAccounts((error, accounts) => {
      tartarus.at(this.props.tartarusAddress).then(instance => {
        instance.createUserCost.call().then(async createUserCost => {
          // let createUserGas = await instance.createUser.estimateGas(
          //   this.props.form.signup.values.username,
          //   {
          //     from: accounts[0],
          //     gasPrice: 20000000000,
          //     value: createUserCost
          //   }
          // );
          // console.log('create user gas - ' + createUserGas.toString());
          // let gasPrice = await this.props.web3.eth.getGasPrice();
          // let createUserTest = createUserGas * gasPrice;
          // console.log(
          //   'create user eth cost - ' +
          //     this.props.web3.utils.fromWei(createUserTest.toString(), 'ether')
          // );
          instance.createUser
            .sendTransaction(this.props.form.signup.values.username, {
              from: accounts[0],
              gasPrice: 20000000000,
              value: createUserCost
            })
            .then(result => {
              this.setState({
                loading: false
              });
              confirmToast();
              this.props.reset('signup');
            })
            .catch(error => {
              console.log('error');
              this.setState({
                loading: false
              });
              errorToast();
            });
        });
      });
    });
  };

  render() {
    return (
      <Form
        loading={this.state.loading}
        onSubmit={this.props.handleSubmit(this.createUser)}
      >
        <FieldWrapper>
          <Field
            name='username'
            label='username'
            type='text'
            component={renderField}
            validate={usernameValidator}
            onChange={this.handleChange}
          />
          {this.state.showIcon ? (
            <IconWrapper>
              {this.state.available ? <ValidIcon size={18} /> : <InvalidIcon />}
            </IconWrapper>
          ) : null}
        </FieldWrapper>
        <InfoWrapper>
          Alphanumeric, lowercase, 3-21 characters, underscore(_) and dash (-) allowed.
        </InfoWrapper>
        <Wrapper>
          {this.state.available ? (
            <SubmitButton />
          ) : (
            <CheckButton onClick={this.handleCheckName} />
          )}
          <CancelButton onClick={this.handleCancel} />
        </Wrapper>
      </Form>
    );
  }
}

export default SignupForm;
