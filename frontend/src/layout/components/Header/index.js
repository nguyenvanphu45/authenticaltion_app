import React from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import imageSvg from '~/assets/svg';
import { FaUserCircle } from 'react-icons/fa';
import { BiUser, BiSolidGroup } from 'react-icons/bi';
import { BsCaretDownFill } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popper from '../../../components/Popper';
import { dispatchLogoutUser } from '../../../redux/actions/authActions';
import { createAxios } from '../../../utils/createInstance';

const cx = classNames.bind(styles);

function Header() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const { user, isLogged } = auth;
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, token, dispatch, dispatchLogoutUser);

    const logout = async () => {
        try {
            await axiosJWT.post('http://localhost:5000/auth/logout', user._id, {
                headers: {token: `Bearer ${token}`}
            });
            dispatch(dispatchLogoutUser());
        } catch (error) {
            console.log(error);
        }
    };

    const userMenu = [
        {
            icon: <FaUserCircle />,
            title: 'My profile',
            to: `/profile`,
        },
        {
            icon: <BiSolidGroup />,
            title: 'Group chat',
            to: '/group',
        },
        {
            icon: <TbLogout />,
            title: 'Logout',
            to: '/',
            onClick: logout,
        },
    ];

    return (
        <div className={cx('header')}>
            <img src={imageSvg.logo} alt="" />
            {isLogged ? (
                <Popper items={userMenu}>
                    <div className={cx('user')}>
                        {user.email}
                        <BsCaretDownFill className={cx('icon-down')} />
                    </div>
                </Popper>
            ) : (
                <Link to="/login" className={cx('user')}>
                    <BiUser className={cx('icon-user')} />
                    Login
                </Link>
            )}
        </div>
    );
}

export default Header;
