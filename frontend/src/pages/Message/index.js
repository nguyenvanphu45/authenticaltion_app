import React from 'react'
import styles from './Message.module.scss'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom';
import SideBar from '../../layout/components/SideBar';

const cx = classNames.bind(styles)

function MessagePage() {
    const location = useLocation()
    const chatLocation = location.state.chat

    return (
        <div className={cx('wrapper')}>
            <SideBar chat={chatLocation} />
            <div className={cx('body')}>
                <div className={cx('header')}>
                    <h3>{chatLocation.name}</h3>
                </div>
            </div>
        </div>
    );
}

export default MessagePage