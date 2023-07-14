import config from '../config';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';

const publicRoutes = [
    { path: config.login, component: LoginPage },
    { path: config.register, component: RegisterPage },
];

export { publicRoutes };
