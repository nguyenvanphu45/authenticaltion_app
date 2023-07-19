import { combineReducers } from 'redux';
import auth from '../reducers/authReducer';
import token from '../reducers/tokenReducer'

export default combineReducers({
    auth,
    token
});
