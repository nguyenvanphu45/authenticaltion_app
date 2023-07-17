import React from 'react';
import styles from './Notification.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const showErrMsg = (msg) => {
    return <div className={cx('errMsg')}>{msg}</div>;
};

export const showSuccessMsg = (msg) => {
    return <div className={cx('successMsg')}>{msg}</div>
}
