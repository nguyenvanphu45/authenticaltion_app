import ACTIONS from '../actions';

const initialState = {
    group: [],
    search: '',
    notification: []
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CREATE_GROUP:
            return {
                ...state,
                group: [...state.group, action.payload],
            };

        case ACTIONS.GET_GROUP:
            return {
                ...state,
                group: action.payload,
            };

        case ACTIONS.SEARCH_GROUP:
            return {
                ...state,
                search: action.payload,
            };

        case ACTIONS.NOTIFICATION:
            return {
                ...state,
                notification: [...state.group, action.payload],
            };

        case ACTIONS.LOGOUT:
            return {
                group: [],
                search: '',
                notification: [],
            };

        default:
            return state;
    }
};

export default groupReducer;
