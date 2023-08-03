import axios from 'axios';

const refreshToken = async () => {
    try {
        const res = await axios.post('/auth/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const decodeToken = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
};

export const createAxios = (user, token, dispatch, state) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = decodeToken(token);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                console.log(data.accessToken)
                const refreshUser = {
                    ...user,
                    // accessToken: data.accessToken,
                };
                dispatch(state(refreshUser));
                dispatch({ type: 'GET_TOKEN', payload: data.accessToken });
                config.headers['Authorization'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
