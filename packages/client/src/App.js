import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import HeaderContainer from './components/Header/Container';
import Home from './components/Home';
import LoginFormContainer from './components/LoginForm/Container';
// import 'react-toastify/dist/ReactToastify.minimal.css';
import StyledToastContainer from './components/Notifications/Toasts/ToastContainer';
import LoadingIndicatorSpinner from './components/shared/LoadingIndicator/Spinner';
import SignupFormContainer from './components/SignupForm/Container';
// import TartarusContract from './contracts/Tartarus.json';
import GlobalStyle from './globalStyle';
import {
  initializeWeb3,
  setTartarusAddress,
  updateUserNotifications,
  updateUserPermissions,
  updateUserLastVisited
} from './redux/actions/actions';
import getWeb3 from './services/web3/getWeb3';
import './style.css';
import theme from './theme';
import { Landing } from 'tartarus-landing';
import { withRouter } from 'react-router';
import { TartarusContract, TartarusProxie } from 'tartarus-contract';
import passiveNotificationEvents from './components/Notifications/passiveNotificationEvents';

const getTartarusAddress = () => {
  return TartarusProxie.proxies['tartarus-contract/Tartarus'][
    TartarusProxie.proxies['tartarus-contract/Tartarus'].length - 1
  ].address;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      notifications: []
    };
  }

  componentDidMount() {
    getWeb3
      .then(results => {
        this.props.dispatch(initializeWeb3(results.web3));
        this.props.dispatch(setTartarusAddress(getTartarusAddress()));
        console.log(results.web3);
        console.log(this.props.web3);
        if (results.web3 === null) {
          this.setState({
            loading: false
          });
        } else {
          this.checkAdmin();
          this.handleNotifications();
        }
        toast.configure();
      })
      .catch(() => {
        console.log('Error finding web3.');
        // toast.configure();
        // this.setState({
        //   loading: false SELECt * FROM table,
        //   sum(carbonAmount)
        // });
      });
  }

  getNotificationTime = async props => {
    const blocksInDay = 5760;
    let currentTime = Date.now();
    let lastNotified = this.props.userSettings[this.props.username]
      .lastNotified;
    let lastBlockNotified = Math.ceil(
      ((currentTime - lastNotified) / 86400000) * blocksInDay
    );
    // console.log(lastBlockNotified);
    return props.number - lastBlockNotified;
  };

  getNotifications = async () => {
    let watchedPosts = this.props.userSettings[this.props.username].watched
      .posts;
    let watchedComments = this.props.userSettings[this.props.username].watched
      .comments;
    let watchedUsers = this.props.userSettings[this.props.username].watched
      .users;
    let combinedEventList = watchedPosts.concat(watchedComments, watchedUsers);
    console.log(combinedEventList);

    let activeNotifications = await Promise.all(
      combinedEventList.map(event => this.getActiveNotification(event))
    );
    // let activeNotifications = [];
    // console.log(activeNotifications);

    let passiveNotifications = await Promise.all(
      passiveNotificationEvents.map(event => this.getPassiveNotification(event))
    );

    // console.log(passiveNotifications);

    let combinedNotifications = activeNotifications.concat(
      passiveNotifications
    );
    // console.log(combinedNotifications);
    let removeNull = combinedNotifications.flat().filter(item => {
      return item !== undefined && item !== [];
    });
    // removeNull.sort((a, b) => b.args.time < a.args.time);
    // removeNull.sort((a, b) => (b.args.time.c[0] > a.args.time.c[0] ? 1 : -1));

    console.log(removeNull);
    console.log(removeNull);
    return removeNull;
  };

  getPassiveNotification = async props => {
    console.log('getPassiveNotifications');
    const contract = require('truffle-contract');
    const latestBlock = await this.props.web3.eth.getBlock('latest');
    let startingBlock = await this.getNotificationTime(latestBlock);
    const tartarus = contract(TartarusContract);
    tartarus.setProvider(this.props.web3.currentProvider);
    let instance = await tartarus.at(this.props.tartarusAddress);
    switch (props) {
      case 'UserCreated':
        console.log('userCreated');
        return new Promise((resolve, reject) => {
          instance
            .UserCreated(
              { user: this.props.web3.utils.fromAscii(this.props.username) },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, userCreated) => {
              console.log('testtt');
              console.log(userCreated);
              resolve(userCreated);
            });
        });
      case 'UserUpdated':
        return new Promise((resolve, reject) => {
          instance
            .UserUpdated(
              { user: this.props.web3.utils.fromAscii(this.props.username) },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, userUpdated) => {
              resolve(userUpdated);
            });
        });
      case 'UserWithdraw':
        return new Promise((resolve, reject) => {
          instance
            .UserWithdraw(
              { user: this.props.web3.utils.fromAscii(this.props.username) },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, userWithdraw) => {
              resolve(userWithdraw);
            });
        });
      case 'AdminCreated':
        return new Promise((resolve, reject) => {
          instance
            .AdminCreated(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, adminCreated) => {
              resolve(adminCreated);
            });
        });
      case 'AdminUpdated':
        return new Promise((resolve, reject) => {
          instance
            .AdminUpdated(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, adminCreated) => {
              resolve(adminCreated);
            });
        });

      case 'AdminRemoved':
        return new Promise((resolve, reject) => {
          instance
            .AdminRemoved(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, adminRemoved) => {
              resolve(adminRemoved);
            });
        });
      case 'AdminBan':
        return new Promise((resolve, reject) => {
          instance
            .AdminBan(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, adminBan) => {
              resolve(adminBan);
            });
        });

      case 'AdminUnban':
        return new Promise((resolve, reject) => {
          instance
            .AdminUnban(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, adminUnban) => {
              resolve(adminUnban);
            });
        });
      case 'AdminPaid':
        return new Promise((resolve, reject) => {
          instance
            .AdminPaid(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, adminPaid) => {
              resolve(adminPaid);
            });
        });
      case 'CommentRemoved':
        return new Promise((resolve, reject) => {
          instance
            .CommentRemoved(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, commentRemoved) => {
              resolve(commentRemoved);
            });
        });
      case 'ForumCreated':
        console.log(this.props.username);
        return new Promise((resolve, reject) => {
          console.log(startingBlock);
          instance
            .ForumCreated(
              { user: this.props.web3.utils.fromAscii(this.props.username) },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, forums) => {
              console.log(forums);
              resolve(forums);
            });
        });
      case 'ModeratorBan':
        return new Promise((resolve, reject) => {
          instance
            .ModeratorBan(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, ModeratorBan) => {
              resolve(ModeratorBan);
            });
        });
      case 'ModeratorUnban':
        return new Promise((resolve, reject) => {
          instance
            .ModeratorUnban(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, moderatorUnban) => {
              resolve(moderatorUnban);
            });
        });
      case 'ModeratorCreated':
        return new Promise((resolve, reject) => {
          instance
            .ModeratorCreated(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: 0,
                toBlock: 'latest'
              }
            )
            .get((error, moderatorCreated) => {
              console.log(moderatorCreated);
              resolve(moderatorCreated);
            });
        });
      case 'ModeratorPaid':
        return new Promise((resolve, reject) => {
          instance
            .ModeratorPaid(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, moderatorPaid) => {
              resolve(moderatorPaid);
            });
        });
      case 'ModeratorRemoved':
        return new Promise((resolve, reject) => {
          instance
            .ModeratorRemoved(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, moderatorRemoved) => {
              resolve(moderatorRemoved);
            });
        });
      case 'ModeratorUpdated':
        return new Promise((resolve, reject) => {
          instance
            .ModeratorUpdated(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, moderatorUpdated) => {
              resolve(moderatorUpdated);
            });
        });
      case 'PostRemoved':
        return new Promise((resolve, reject) => {
          instance
            .PostRemoved(
              {
                targetUser: this.props.web3.utils.fromAscii(this.props.username)
              },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, postRemoved) => {
              resolve(postRemoved);
            });
        });
      case 'PostLocked':
        return new Promise((resolve, reject) => {
          instance
            .PostLocked(
              { user: this.props.web3.utils.fromAscii(this.props.username) },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, postLocked) => {
              resolve(postLocked);
            });
        });
      default:
        return;
    }
  };

  getActiveNotification = async props => {
    console.log('getNotifications');
    const contract = require('truffle-contract');
    const tartarus = contract(TartarusContract);
    tartarus.setProvider(this.props.web3.currentProvider);
    let instance = await tartarus.at(this.props.tartarusAddress);
    const latestBlock = await this.props.web3.eth.getBlock('latest');
    let startingBlock = await this.getNotificationTime(latestBlock);
    // console.log(latestBlock);
    // console.log(startingBlock);
    console.log(props);
    switch (props.event) {
      case 'PostCreated':
        return new Promise((resolve, reject) => {
          instance
            .CommentCreated(
              { targetId: props.postId },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, comments) => {
              console.log(comments);
              resolve(...comments);
            });
        });
      case 'CommentCreated':
        return new Promise((resolve, reject) => {
          console.log(props);
          instance
            .CommentCreated(
              { postId: props.args.postId, targetId: props.commentId },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, comments) => {
              resolve(...comments);
            });
        });

      default:
        console.log(props);
        // let userPosts = [];
        let userComments = [];
        return new Promise((resolve, reject) => {
          instance
            .CommentCreated(
              { user: props.userId },
              {
                fromBlock: startingBlock,
                toBlock: 'latest'
              }
            )
            .get((error, comments) => {
              instance
                .PostCreated(
                  { user: props.userId },
                  {
                    fromBlock: startingBlock,
                    toBlock: 'latest'
                  }
                )
                .get((error, posts) => {
                  userComments = comments;
                  userComments.concat(posts);
                  console.log(userComments);
                  userComments.map(comment => {
                    comment.userWatched = true;
                  });
                  console.log(userComments);
                  resolve(...userComments);
                });
            });
        });
    }
  };

  handleNotifications = async () => {
    if (this.props.username !== null && this.props.username !== undefined) {
      console.log('notificati');
      let newNotifications = await this.getNotifications();
      console.log(newNotifications);
      console.log(newNotifications.length);
      if (newNotifications.length > 0) {
        console.log('test');
        console.log(newNotifications);
        let newNotificationsArray = [
          ...this.props.userSettings[this.props.username].notifications,
          ...newNotifications
        ];
        // console.log(newNotificationsArray)
        // newNotificationsArray.concat(newNotifications);
        newNotificationsArray.sort((a, b) =>
          a.args.time < b.args.time ? 1 : -1
        );
        // console.log(newNotificationsArray.concat(newNotifications));
        let payload = {
          username: this.props.username,
          // notifications: []
          notifications: newNotificationsArray
        };
        this.props.dispatch(updateUserNotifications(payload));
      }
    }
  };

  handleWelcomeClick = () => {
    this.props.history.push('/');
    this.props.dispatch(updateUserLastVisited());
  };

  checkAdmin = () => {
    const contract = require('truffle-contract');
    const tartarus = contract(TartarusContract);
    tartarus.setProvider(this.props.web3.currentProvider);
    tartarus.at(this.props.tartarusAddress).then(instance => {
      instance.getAdmin
        .call(this.props.web3.utils.fromAscii(this.props.username))
        .then(async isAdmin => {
          console.log(isAdmin);
          this.props.dispatch(
            updateUserPermissions({ type: 'admin', permissions: isAdmin })
          );
          this.setState({
            loading: false
          });
        });
    });
  };

  render() {
    if (this.state.loading) {
      return <LoadingIndicatorSpinner />;
    } else {
      return (
        <ThemeProvider theme={theme(this.props.dark)}>
          <GlobalStyle />
          <Route component={HeaderContainer} />
          <Switch>
            <Route path='/signup' component={SignupFormContainer} />
            <Route path='/login' component={LoginFormContainer} />
            <Route
              exact
              path='/welcome'
              // onChange={this.handleNotifications()}
              component={() => (
                <Landing
                  theme={this.props.dark}
                  onClick={() => this.handleWelcomeClick()}
                />
              )}
            />
            <Route
              exact
              path='/'
              // onChange={this.handleNotifications()}
              render={({ match }) => {
                console.log(this.props.lastVisited);
                if (
                  Date.now() - 7 * 24 * 60 * 60 * 1000 >
                    this.props.lastVisited &&
                  this.props.username === null
                ) {
                  this.props.history.push('/welcome');
                  return null;

                  // return (
                  //   <Landing
                  //     theme={this.props.dark}
                  //     onClick={() => this.handleWelcomeClick()}
                  //   />
                  // );
                } else {
                  return <Home key={match.url} />;
                }
              }}
            />
            <Route
              path='/'
              // onChange={this.handleNotifications()}
              render={({ match }) => {
                return <Home key={match.url} />;
              }}
            />
          </Switch>
          <Route
            path={/\/(?!welcome)/}
            render={({ match }) => {
              return <StyledToastContainer transition={Zoom} />;
            }}
          />
        </ThemeProvider>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3,
    dark: state.theme.dark,
    username: state.user.username,
    lastVisited: state.user.lastVisited,
    tartarusAddress: state.tartarus.tartarusAddress,
    userSettings: state.user.userSettings
  };
}

const AppContainer = withRouter(connect(mapStateToProps)(App));

export default AppContainer;
