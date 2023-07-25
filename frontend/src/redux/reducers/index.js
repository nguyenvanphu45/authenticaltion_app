import { combineReducers } from 'redux';
import auth from '../reducers/authReducer';
import token from '../reducers/tokenReducer';
import chat from '../reducers/chatReducer';

export default combineReducers({
    auth,
    token,
    chat,
});
