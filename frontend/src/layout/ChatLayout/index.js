import React from 'react';
import SideBar from '../components/SideBar';
import styles from './ChatLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function ChatLayout({ children}) {
    return (
        <div className={cx('wrapper')}>
            <SideBar />
            <div className={cx('body')}>{children}</div>
        </div>
    );
}

export default ChatLayout;
