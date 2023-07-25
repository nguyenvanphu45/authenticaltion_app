import React from 'react';
import styles from './Channel.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Channel({ chat }) {
    console.log(chat)

    return (
        <div className={cx('container')}>
            <h3>{chat.name}</h3>
            <p>{chat.description}</p>
            <h3>Members</h3>
            <div className={cx('member')}>
                {chat.users.map((user) => {
                    return <div>
                        <img src={user.image} alt="" />
                    </div>;
                })}
            </div>
        </div>
    );
}

export default Channel;
