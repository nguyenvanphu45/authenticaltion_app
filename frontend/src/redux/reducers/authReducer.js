import ACTIONS from '../actions';

const initialState = {
    user: [],
    isLogged: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                user: action.payload,
                isLogged: true,
            };

        case ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            };

        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case ACTIONS.LOGOUT:
            return {
                user: [],
                isLogged: false,
            };

        default:
            return state;
    }
};

export default authReducer;
