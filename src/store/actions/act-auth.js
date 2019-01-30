import * as actionTypes from '../action-types';
import axios from  'axios';

export const signUp = (email, password, cb) => {
    return dispatch => {
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyATHgYY6nkeUjqCK_giyqlDOR_QhSjo_ME',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .then(res => res && cb())
        .catch(console.log)
    }
}

export const signInSuccess = (data) => {
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        email: data.email,
        idToken: data.idToken,
        localId: data.localId
    }
}

export const signOut = () => {
    localStorage.clear();
    return{
        type: actionTypes.SIGN_OUT
    }
}

export const signOutTimeout = (time) => {
    return dispatch => {
        setTimeout( ()=>{
            dispatch(signOut())
        }, 1000 * time)
    }
}

export const signIn = (email, password) => {
    return dispatch => {
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyATHgYY6nkeUjqCK_giyqlDOR_QhSjo_ME',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(res => {
                if(res){
                    dispatch(signInSuccess(res.data))
                    localStorage.setItem('localId', res.data.localId);
                    localStorage.setItem('idToken', res.data.idToken);
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem('expiresIn', new Date(Date.now() + (+res.data.expiresIn * 1000)));
                }
                dispatch(authInit())
                dispatch(signOutTimeout(res.data.expiresIn));
            })
        .catch(console.log)
    }
}

export const authInit = () => {
    return dispatch => {
        if(new Date(localStorage.getItem('expiresIn')).getTime() > Date.now()){
            dispatch(signInSuccess({
                email: localStorage.getItem('email'),
                idToken: localStorage.getItem('idToken'),
                localId: localStorage.getItem('localId')
            }));
            dispatch(signOutTimeout((new Date(localStorage.getItem('expiresIn')).getTime() - Date.now()) / 1000 ));
        }
    }
}