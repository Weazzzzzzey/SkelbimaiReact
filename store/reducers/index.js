import {adReducer} from './adReducer';
import {userReducer} from './userReducer';
import {userLogin} from './userAuthReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    advertises: adReducer,
    users : userReducer,
    login: userLogin,
});