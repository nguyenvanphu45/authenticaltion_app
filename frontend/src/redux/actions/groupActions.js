import ACTIONS from ".";

export const dispatchCreateGroup = (group) => {
    return {
        type: ACTIONS.CREATE_GROUP,
        payload: group,
    };
}

export const fetchGroup = async (token, axiosJWT) => {
    const res = await axiosJWT.get('/group', {
        headers: { Authorization: `Bearer ` + token },
        withCredentials: true,
    });

    return res
};

export const dispatchGetGroup = (group) => {
    return {
        type: ACTIONS.GET_GROUP,
        payload: group,
    };
}

export const dispatchSearchGroups = (text) => {
    return {
        type: ACTIONS.SEARCH_GROUP,
        payload: text
    }
}

export const dispatchNotification = (message) => {
    return {
        type: ACTIONS.NOTIFICATION,
        payload: message
    }
}