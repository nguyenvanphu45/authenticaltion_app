import React from 'react';
import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import SideBar from '../../layout/components/SideBar';

const cx = classNames.bind(styles);

function ChatPage() {
    return (
        <div className={cx('wrapper')}>
            <SideBar />
            <div className={cx('body')}></div>
        </div>
    );
}

export default ChatPage;
