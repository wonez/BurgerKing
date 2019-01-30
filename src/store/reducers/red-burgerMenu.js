import * as actionTypes from '../action-types';
import { getPrice, updateState } from './utility/utility-burgerMenu';
import { PRICES } from '../../components/BurgerMenu/BurgerMenu';

const defaultState = {
    ingredients: null,
    price: 3.00,
    err: null,
    built: false
}

const reducer = (state = defaultState, action) => {

    switch(action.type){
        case actionTypes.ADD_ING:
            return updateState( state, 
                                {price: state.price + PRICES[action.ing]}, 
                                {[action.ing]: state.ingredients[action.ing] + 1})
        case actionTypes.REMOVE_ING:
            return updateState( state, 
                                {price: state.price - PRICES[action.ing]}, 
                                {[action.ing]: state.ingredients[action.ing] - 1})
        case actionTypes.GET_INGREDIENTS_SUCCESS:
            return updateState(
                state, 
                {ingredients : action.ingredients, 
                 price: getPrice(action.ingredients)})
        case actionTypes.GET_INGREDIENTS_FAILED:
            return updateState(state, {err: action.err})
        case actionTypes.SET_BUILT:
            return updateState(state, {built: action.val})
        default:
            return state;
    }
}

export default reducer;