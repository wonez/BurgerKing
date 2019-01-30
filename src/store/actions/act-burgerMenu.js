import * as actionTypes from '../action-types'
import axios from "../../axios-order";

export const addIng = (ing) => {
    return {
        type: actionTypes.ADD_ING,
        ing: ing
    }
}

export const removeIng = (ing) => {
    return {
        type: actionTypes.REMOVE_ING,
        ing: ing
    }
}

export const getIngredientsSuccess = (ing) => {
    return {
        type: actionTypes.GET_INGREDIENTS_SUCCESS,
        ingredients: ing
    };
}

export const getIngredentsFailed = (err) => {
    return{
        type: actionTypes.GET_INGREDIENTS_FAILED,
        err: err
    }
}

export const setBuilt = (val) => {
    return{
        type: actionTypes.SET_BUILT,
        val
    }
}

export const getIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then( res => dispatch(getIngredientsSuccess(res.data)))
            .catch( err => dispatch(getIngredentsFailed(err)))
    };
}