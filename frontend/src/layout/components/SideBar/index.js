import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import imageSvg from '~/assets/svg';
import { FaUserCircle, FaChevronLeft } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../../components/Popper/Menu';
import { createAxios } from '../../../utils/createInstance';
import { dispatchLogoutUser } from '../../../redux/actions/authActions';
import Modal from 'react-modal';
import FormModal from '../../../components/FormModal';
import Search from '../Search';
import Channel from '../Channel';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        overflow: 'visible',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        border: 'none',
        borderRadius: '24px',
    },
    overlay: {
        background: '#120f1380',
    },
};

function SideBar({ chat }) {
    const [openModal, setOpenModal] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, token, dispatch, dispatchLogoutUser);

    const logout = async () => {
        try {
            await axiosJWT.post('http://localhost:5000/auth/logout', user._id, {
                headers: { token: `Bearer ${token}` },
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
            icon: <img src={imageSvg.tweeter} alt="" />,
            title: 'Tweeter',
            to: '/chat',
        },
        {
            icon: <TbLogout />,
            title: 'Logout',
            to: '/',
            onClick: logout,
        },
    ];

    const closeModal = () => {
        setOpenModal(false);
    };

    const handleBack = () => {
        navigate('/chat');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                {chat ? (
                    <div className={cx('title')}>
                        <FaChevronLeft onClick={handleBack} />
                        <h3>All Channel</h3>
                    </div>
                ) : (
                    <div className={cx('title', 'space')}>
                        <h3>Channels</h3>
                        <button onClick={() => setOpenModal(true)}>
                            <img src={imageSvg.plus} alt="" />
                        </button>
                        <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                            <FormModal onClose={closeModal} />
                        </Modal>
                    </div>
                )}
                {chat ? <Channel chat={chat} /> : <Search />}
            </div>
            <div className={cx('footer')}>
                <div className={cx('user')}>
                    <img src={user.image} alt="" />
                    <h2>{user.name}</h2>
                </div>
                <Menu items={userMenu} sidebar>
                    <div>
                        <FiChevronDown className={cx('icon-down')} />
                    </div>
                </Menu>
            </div>
        </div>
    );
}

export default SideBar;
