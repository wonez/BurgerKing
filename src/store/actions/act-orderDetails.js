import * as actionTypes from '../action-types';
import axios from '../../axios-order';
import { getPrice } from '../reducers/utility/utility-burgerMenu'

export const postIngredientsSuccess = (id, data) => {
   return {
        type: actionTypes.POST_INGREDIENTS_SUCCESS,
        id: id,
        data: data
   } 
}

export const postIngredientsFailed = (err) => {
    return{
        type: actionTypes.POST_INGREDIENTS_FAILED,
        err: err
    }
}

export const postIngredients = () => {
    return{
        type: actionTypes.POST_INGREDIENTS
    }
}

export const getOrdersFailed = (err) => {
    return {
        type: actionTypes.GET_ORDERS_FAILED,
        err: err
    }
}

export const getOrdersSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        orders: orders
    }
}

export const getOrders = (token, id) => {
    return dispatch => {
        axios.get(`/orders.json?auth=${token}&orderBy="id"&equalTo="${id}"`)
            .then( res => {
                dispatch(getOrdersSuccess(Object.values(res.data))) 
            })
            .catch( err => getOrdersFailed(err) )
    }
}

export const tryPostIngredients = (postData, token, handleModal) => {
    return dispatch => {
        dispatch(postIngredients());
        postData.price = getPrice(postData.ingredients);
        axios.post('/orders.json?auth='+token, postData)
            .then( data => {
                dispatch(postIngredientsSuccess(data.name, postData))
                handleModal()
            })
            .catch( err => dispatch(postIngredientsFailed(err))) 
    }
}