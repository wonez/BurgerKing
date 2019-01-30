import { combineReducers } from '../../../../../../../Library/Caches/typescript/2.9/node_modules/redux'

import burgerMenu from './red-burgerMenu';
import orderDetails from './red-orderDetails';
import auth from './red-auth'

export default combineReducers({
    burgerMenu,
    orderDetails,
    auth
});