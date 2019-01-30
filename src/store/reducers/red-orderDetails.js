import * as actionTypes from "../action-types";
import { updateState } from './utility/utility-orderDetails';

const defaultState = {
    orders: [],
    loading: false,
    loaded: false,
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case actionTypes.POST_INGREDIENTS:
            return updateState(state, {loading: true})
        case actionTypes.POST_INGREDIENTS_SUCCESS:
            const newOrder = {
                ...action.date,
                id: action.id
            }
            return updateState(state, { loading: false, orders: state.orders.concat(newOrder)})
        case actionTypes.POST_INGREDIENTS_FAILED:
            return updateState(state, { loading: false, err: action.err })
        case actionTypes.GET_ORDERS_SUCCESS:
            return updateState(state, { loaded: true, orders: action.orders})
        case actionTypes.GET_ORDERS_FAILED:
            return updateState(state, { loaded: true })
        default:
            return state;
    }
}

export default reducer;