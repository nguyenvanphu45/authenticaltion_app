import config from '../config';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import ChatPage from '../pages/Chat';
import EditPage from '../pages/Edit';
import HomePage from '../pages/HomePage';
import MessagePage from '../pages/Message';
import ProfilePage from '../pages/Profile';

const publicRoutes = [
    { path: config.home, component: HomePage },
    { path: config.login, component: LoginPage, layout: null },
    { path: config.register, component: RegisterPage, layout: null },
    { path: config.profile, component: ProfilePage },
    { path: config.edit, component: EditPage },
    { path: config.chat, component: ChatPage, layout: null },
    { path: config.message, component: MessagePage, layout: null },
];

export { publicRoutes };
