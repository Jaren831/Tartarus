import React, { Component } from 'react'
import { connect } from 'react-redux'


class PostPage extends Component {
	// constructor(match) {
	// 	super(match)
	// 	console.log(match.match.params.forumAddress)
  //   this.state = {
  //     forumAddress: match.match.params.forumAddress
  //   }
  // }
	render() {
		return (
			<div>
				{/* <Header
					currentOwnerAddress={this.props.accounts.currentOwnerAddress}
					currentUserAddress={this.props.accounts.currentUserAddress}
					currentForum={this.props.currentForum}
					currentForumAddress={this.props.currentForumAddress}
				/>
				<Divider />
				<PostListContainer forumAddress={this.state.forumAddress}/> */}
				Test
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		web3: state.web3,
		tartarusAddress: state.tartarus.tartarusAddress,
		accounts: state.accounts,
		currentForum: state.forum.currentForum,
		currentForumAddress: state.forum.currentForumAddress
	};
}

export default connect(mapStateToProps)(PostPage);