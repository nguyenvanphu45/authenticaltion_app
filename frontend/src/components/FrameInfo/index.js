import React from 'react';
import styles from './FrameInfo.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function FrameInfo({ children }) {
    return (
        <>
            <div className={cx('form')}>{children}</div>
            <div className={cx('footer')}>
                <p>
                    Create by <span>username</span>
                </p>
                <p>devChallenges.io</p>
            </div>
        </>
    );
}

export default FrameInfo;
