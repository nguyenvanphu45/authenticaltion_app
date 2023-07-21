import axios from 'axios';
import jwt_decode from 'jwt-decode';

const refreshToken = async () => {
    try {
        const res = await axios.post('http://10.10.23.32:5000/auth/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const createAxios = (user, token, dispatch, state) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(token);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    // accessToken: data.accessToken,
                };
                dispatch(state(refreshUser));
                dispatch({ type: 'GET_TOKEN', payload: data.accessToken });
                config.headers['token'] = 'Bearer ' + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
