import ACTIONS from ".";

export const dispatchCreateGroup = (chat) => {
    return {
        type: ACTIONS.CREATE_GROUP,
        payload: chat
    }
}

export const fetchChat = async (token, axiosJWT) => {
    const res = await axiosJWT.get('/chat', {
        headers: { token: `Bearer ` + token },
    });

    return res
};

export const dispatchGetChat = (chat) => {
    return {
        type: ACTIONS.GET_CHAT,
        payload: chat
    }
}