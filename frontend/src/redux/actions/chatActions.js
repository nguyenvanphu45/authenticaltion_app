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

export const fetchMember = async (token, axios) => {
    const res = await axios.get('/chat/member', {
        headers: { token: `Bearer ` + token },
    });

    return res;
}

export const dispatchGetChat = (chat) => {
    return {
        type: ACTIONS.GET_CHAT,
        payload: chat
    }
}