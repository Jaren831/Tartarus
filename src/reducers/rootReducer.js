import { combineReducers } from 'redux'
import web3Reducer from './web3Reducer'
import tartarusReducer from './tartarusReducer'
import accountsReducer from './accountsReducer'
import forumReducer from './forumReducer'
import pageReducer from './pageReducer'
import drawerReducer from './drawerReducer'
import commentReducer from './commentReducer'

const rootReducer = combineReducers({
    web3: web3Reducer,
    accounts: accountsReducer,
    tartarus: tartarusReducer,
    forum: forumReducer,
    page: pageReducer,
    drawerState: drawerReducer,
    comment: commentReducer
});


export default rootReducer