import React, { Component } from 'react';
import LoadingIndicatorSpinner from '../../shared/LoadingIndicator/Spinner';
import Empty from '../../shared/Empty';
import CommentFormContainer from '../../CreateCommentForm/Container';
import CommentListContainer from '../../Comment/CommentList/Container';
import TartarusContract from '../../../contracts/Tartarus.json';
import PostContainer from '../Post/Container';
import { updateUserPermissions } from '../../../redux/actions/actions';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      post: null,
      exists: true,
      showCommentForm: false
    };
    this.instantiateContract = this.instantiateContract.bind(this);
  }

  componentDidMount() {
    this.instantiateContract();
  }

  instantiateContract() {
    const contract = require('truffle-contract');
    const tartarus = contract(TartarusContract);
    tartarus.setProvider(this.props.web3.currentProvider);
    this.props.web3.eth.getAccounts((error, accounts) => {
      tartarus.at(this.props.tartarusAddress).then(instance => {
        instance.getModerator
          .call(
            this.props.web3.utils.fromAscii(this.props.username),
            this.props.web3.utils.fromAscii(this.props.forumName)
          )
          .then(moderator => {
            console.log(moderator);
            let permissionsObject = {
              type: 'moderator',
              permissions: moderator
            };
            this.props.dispatch(updateUserPermissions(permissionsObject));
          });
        instance
          .PostCreated(
            {
              postId: this.props.postId
            },
            {
              fromBlock: 0,
              toBlock: 'latest'
            }
          )
          .get((error, post) => {
            if (
              post[0].args.creator ===
              '0x0000000000000000000000000000000000000000000000000000000000000000'
            ) {
              this.setState({
                exists: false,
                loading: false
              });
            } else {
              this.setState({
                post: post[0],
                loading: false
              });
            }
          });
      });
    });
  }

  handleReply = props => {
    this.setState({
      currentComment: props
    });
  };

  render() {
    if (this.state.loading) return <LoadingIndicatorSpinner />;
    if (!this.state.exists) return <Empty />;
    return (
      <>
        <PostContainer post={this.state.post.args} showFullPost={true} />
        <CommentFormContainer
          postId={this.props.postId}
          forumName={this.props.forumName}
          targetId={this.props.postId}
        />
        <CommentListContainer
          forumName={this.props.forumName}
          postId={this.props.postId}
        />
      </>
    );
  }
}

export default PostDetail;