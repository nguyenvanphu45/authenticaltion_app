import ACTIONS from "../actions";

const initialState = {
    chat: []
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CREATE_GROUP:
            return {
                ...state,
                chat: [...state.chat, action.payload]
            }

        case ACTIONS.GET_CHAT:
            return {
                ...state,
                chat: action.payload
            }

        default:
            return state
    }
}

export default chatReducer