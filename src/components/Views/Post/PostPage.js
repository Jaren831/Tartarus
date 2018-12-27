import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import Divider from '@material-ui/core/Divider';
import PostContract from '../../../contracts/Post.json'
import Loading from '../../Loading'
import { setCurrentPage, setCurrentPostAddress } from '../../../redux/actions/actions'
import CommentListContainer from '../Comment/CommentListContainer' 
import ipfs from '../../../services/ipfs/ipfs'

class PostPage extends Component {
	constructor(match) {
		super(match)
		this.state = {
			postAddress: match.match.params.postAddress,
			postTitle: null,
			loading: true
		}
		this.instantiateContract = this.instantiateContract.bind(this)
	}

	componentDidMount() {
		this.instantiateContract()
		this.props.dispatch(setCurrentPage("Post"))
		this.props.dispatch(setCurrentPostAddress(this.state.postAddress))
	}

	instantiateContract = () => {
		const contract = require('truffle-contract')
		const post = contract(PostContract)
		post.setProvider(this.props.web3.currentProvider)
		post.at(this.state.postAddress).then((instance) => {
			instance.postInfo.call().then((result) => {
				ipfs.catJSON(result[0], (err, ipfsData) => {
					this.setState({
						postTitle: ipfsData.title,
						loading: false
					})
				})
			})
		}).catch((err) => {
			console.log("error")
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<div>
				<PostHeader
					currentOwnerAddress={this.props.accounts.currentOwnerAddress}
					currentUserAddress={this.props.accounts.currentUserAddress}
					currentPost={this.state.postTitle}
					currentPostAddress={this.state.postAddress}
				/>
				<Loading/>
			</div>
			)
		} else {
			return (
				<div>
					<PostHeader
						currentOwnerAddress={this.props.accounts.currentOwnerAddress}
						currentUserAddress={this.props.accounts.currentUserAddress}
						currentPost={this.state.postTitle}
						currentPostAddress={this.state.postAddress}
					/>
					<CommentListContainer />
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		web3: state.web3,
		accounts: state.accounts,
	};
}

export default connect(mapStateToProps)(PostPage);