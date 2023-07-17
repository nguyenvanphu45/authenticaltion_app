import config from '../config';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import EditPage from '../pages/Edit';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/Profile';

const publicRoutes = [
    { path: config.home, component: HomePage },
    { path: config.login, component: LoginPage, layout: null },
    { path: config.register, component: RegisterPage, layout: null },
    { path: config.profile, component: ProfilePage },
    { path: config.edit, component: EditPage },
];

export { publicRoutes };
