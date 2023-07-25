import React from 'react';
import styles from './DefaultLayout.module.scss';
import className from 'classnames/bind';
import Header from '../components/Header';

const cx = className.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('body')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
