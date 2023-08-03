import React, { useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../layout/components/SideBar';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Message from '../../components/Message';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ChatPage() {
    const { id } = useParams();
    const group = useSelector((state) => state.group.group);
    const groupSelected = group.find((g) => g._id === id);
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!groupSelected) {
            navigate('/chat');
        }
    }, []);

    return (
        <>
            {groupSelected && (
                <div className={cx('wrapper')}>
                    <div className={cx('sidebar', isActive && 'active')}>
                        <SideBar chat={groupSelected} />
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('header')}>
                            <FiMenu className={cx('icon')} onClick={() => setIsActive(true)} />
                            <h3>{groupSelected.name}</h3>
                            <div className={cx('icon-close', !isActive && 'no-active')}>
                                <IoClose className={cx('icon')} onClick={() => setIsActive(false)} />
                            </div>
                        </div>
                        <div className={cx('message')}>
                            <Message groupSelected={groupSelected} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatPage;
