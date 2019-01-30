import * as actioTypes from '../action-types';

const defaultState = {
    localId: null,
    idToken: null,
    email: null,
}

const signInSuccess = (state, email, idToken, localId) => {
    return {
        email,
        idToken,
        localId
    }
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case actioTypes.SIGN_IN_SUCCESS: 
            return signInSuccess(state, action.email, action.idToken, action.localId)
        case actioTypes.SIGN_OUT:
            return {localId: null, idToken: null, email: null}
        default:
            return state
    }
}

export default reducer;