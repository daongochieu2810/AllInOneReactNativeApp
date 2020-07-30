import { combineReducers } from 'redux'
const initCurrentUserState = {
    user: {}
}

const currentUserReducer = (state = initCurrentUserState, action) => {
    switch(action.type) {
        case "SET_CURRENT_USER": {
            return {
                user: action.user
            }
        }
        default: {
            return state
        }
    }
}

export default combineReducers({
    currentUser: currentUserReducer
})


