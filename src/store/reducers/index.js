import { combineReducers } from 'redux'

import burgerMenu from './red-burgerMenu';
import orderDetails from './red-orderDetails';
import auth from './red-auth'

export default combineReducers({
    burgerMenu,
    orderDetails,
    auth
});