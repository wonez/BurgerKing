import * as actionTypes from '../action-types';
import reducer from './red-auth';

describe('Auth reducer', ()=>{
    
    const defaultState = {
        localId: null,
        idToken: null,
        email: null,
    }

    const storedState = {
        localId: 'some-id',
        idToken: 'some-token',
        email: 'some-email',
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(defaultState)
    })
    
    it('should store id, token and email upon sign in', ()=>{

        expect(reducer(defaultState, {
            type: actionTypes.SIGN_IN_SUCCESS,
            localId: 'some-id',
            idToken: 'some-token',
            email: 'some-email',
        })).toEqual(storedState)
    })

    it('should remove id, token and emial upon sign out', ()=>{
        expect(reducer(storedState, {type: actionTypes.SIGN_OUT})).toEqual(defaultState)
    });
})