/*
 * action types
 */

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
export const CURRENT_USER_ADDRESS = 'CURRENT_USER_ADDRESS'
export const CURRENT_OWNER_ADDRESS = 'CURRENT_OWNER_ADDRESS'
export const TARTARUS_ADDRESS = 'TARTARUS_ADDRESS'
export const TARTARUS_INSTANCE = 'TARTARUS_INSTANCE'
export const DRAWER_STATE = 'DRAWER_STATE'
export const CURRENT_FORUM = 'CURRENT_FORUM'
export const UPDATE_FORUM = 'UPDATE_FORUM'
export const CURRENT_FORUM_ADDRESS = 'CURRENT_FORUM_ADDRESS'
export const CURRENT_POST_ADDRESS = 'CURRENT_POST_ADDRESS'
export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const UPDATE_FORUM_SUBSCRIPTIONS = 'UPDATE_FORUM_SUBSCRIPTIONS'

/*
 * action creators
 */

export function initializeWeb3(web3) {
    return {
        type: WEB3_INITIALIZED,
        payload: web3
    }
}

export function setCurrentUserAddress(userAddress) {
    return {
        type: CURRENT_USER_ADDRESS,
        payload: userAddress
    }
}

export function setCurrentOwnerAddress(ownerAddress) {
    return {
        type: CURRENT_OWNER_ADDRESS,
        payload: ownerAddress
    }
}

export function setTartarusAddress(tartarusAddress) {
    return {
        type: TARTARUS_ADDRESS,
        payload: tartarusAddress
    }
}

export function setTartarusInstance(tartarusInstance) {
    return {
        type: TARTARUS_INSTANCE,
        payload: tartarusInstance
    }
}

export function setDrawerState() {
    return {
        type: DRAWER_STATE
    }
}

export function setCurrentForum(currentForum) {
    return {
        type: CURRENT_FORUM,
        payload: currentForum
    }
}

export function setCurrentForumAddress(currentForumAddress) {
    return {
        type: CURRENT_FORUM_ADDRESS,
        payload: currentForumAddress
    }
}

export function setCurrentPostAddress(currentPostAddress) {
    return {
        type: CURRENT_POST_ADDRESS,
        payload: currentPostAddress
    }
}

export function updateForum(newForum) {
    return {
        type: UPDATE_FORUM,
        payload: newForum
    }
}

export function updateForumSubscriptions(forumSubscriptions) {
    return {
        type: UPDATE_FORUM_SUBSCRIPTIONS,
        payload: forumSubscriptions
    }
}

export function setCurrentPage(newPage) {
    return {
        type: UPDATE_PAGE,
        payload: newPage
    }
}

export function setCommentSortType(newCommentSortType) {
    //console.log(newCommentSortType); //this is triggering
    return {
        type: UPDATE_COMMENTS,
        payload: newCommentSortType
    }
}