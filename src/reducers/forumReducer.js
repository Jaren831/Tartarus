import {
	CURRENT_FORUM,
	CURRENT_FORUM_ADDRESS,
	CURRENT_POST_ADDRESS,
	UPDATE_COMMENTS,
	UPDATE_FORUM
} from '../actions/actions';

const initialState = {
	currentForum: "Frontpage",
	currentForumAddress: null,
	currentPostAddress: null, 
	sorting: "newest"
}

const forumReducer = (state = initialState, action) => {
	switch (action.type) {
		case CURRENT_FORUM:
			return {
				...state,
				currentForum: action.payload
			};
		case CURRENT_FORUM_ADDRESS:
			return {
				...state,
				currentForumAddress: action.payload
			};
		case CURRENT_POST_ADDRESS:
			return {
				...state,
				currentPostAddress: action.payload
			};
		case UPDATE_FORUM:
			return {
				...state,
				currentForum: action.payload.name,
				currentForumAddress: action.payload.address
			};
		case UPDATE_COMMENTS:
			return {
				...state,
				sorting: action.payload
			};
		default:
			return state
	}
}

export default forumReducer