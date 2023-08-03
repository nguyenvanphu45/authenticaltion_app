import { combineReducers } from 'redux';
import auth from '../reducers/authReducer';
import token from '../reducers/tokenReducer';
import group from '../reducers/groupReducer';

export default combineReducers({
    auth,
    token,
    group,
});
