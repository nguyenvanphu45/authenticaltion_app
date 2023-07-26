import React from 'react';
import styles from './Channel.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Channel({ chat }) {

    return (
        <div className={cx('container')}>
            <h3>{chat.name}</h3>
            <p>{chat.description}</p>
            <h3>Members</h3>
            <div className={cx('member')}>
                {chat.users.map((user) => {
                    return (
                        <div className={cx('member-item')}>
                            <img src={user.image} alt="" />
                            <h4>{user.name}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Channel;
