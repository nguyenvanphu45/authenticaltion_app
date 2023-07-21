import ACTIONS from '.';

export const dispatchLogin = (user) => {
    return {
        type: ACTIONS.LOGIN,
        payload: user,
    };
};

export const fetchUser = async (id, token, axiosJWT) => {
    const res = await axiosJWT.get('http://10.10.23.32:5000/users/' + id, {
        headers: { token: `Bearer ` + token },
    });

    return res;
};

export const dispatchGetUser = (user) => {
    return {
        type: ACTIONS.GET_USER,
        payload: user,
    };
};

export const dispatchUpdateUser = (user) => {
    return {
        type: ACTIONS.UPDATE_USER,
        payload: user,
    };
};

export const dispatchLogoutUser = () => {
    return {
        type: ACTIONS.LOGOUT,
    };
};
